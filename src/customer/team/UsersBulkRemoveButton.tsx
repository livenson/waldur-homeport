import { Trash } from '@phosphor-icons/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customersDeleteUser, projectsDeleteUser } from 'waldur-js-client';

import { translate } from '@waldur/i18n';
import { waitForConfirmation } from '@waldur/modal/actions';
import { PermissionEnum } from '@waldur/permissions/enums';
import { hasPermission } from '@waldur/permissions/hasPermission';
import { showErrorResponse, showSuccess } from '@waldur/store/notify';
import { ActionButton } from '@waldur/table/ActionButton';
import { useUser } from '@waldur/workspace/hooks';
import { getCustomer } from '@waldur/workspace/selectors';

export const UsersBulkRemoveButton = ({ rows, refetch }) => {
  const currentUser = useUser();
  const currentCustomer = useSelector(getCustomer);
  const canRemoveUsers = hasPermission(currentUser, {
    permission: PermissionEnum.DELETE_CUSTOMER_PERMISSION,
    customerId: currentCustomer.uuid,
  });
  if (!canRemoveUsers) {
    return null;
  }

  const [isRemoving, setIsRemoving] = useState(false);
  const dispatch = useDispatch();

  const callback = async () => {
    try {
      await waitForConfirmation(
        dispatch,
        translate('Confirmation'),
        translate(
          'Are you sure you want to remove {count} selected users from organization {organization_name}?',
          {
            count: rows.length,
            organization_name: currentCustomer.name,
          },
        ),
        { forDeletion: true },
      );
    } catch {
      return;
    }
    try {
      setIsRemoving(true);
      for (const user of rows) {
        try {
          await Promise.all(
            user.projects.map((project) =>
              projectsDeleteUser({
                path: { uuid: project.uuid },
                body: {
                  user: user.uuid,
                  role: project.role_name,
                },
              }),
            ),
          );

          if (user.role_name) {
            await customersDeleteUser({
              path: { uuid: currentCustomer.uuid },
              body: {
                user: user.uuid,
                role: user.role_name,
              },
            });
          }
        } catch (e) {
          dispatch(
            showErrorResponse(
              e,
              translate('Unable to remove user {userName}.', {
                userName: user.full_name || user.username,
              }),
            ),
          );
        }
      }
      await refetch();
      dispatch(
        showSuccess(
          translate('Selected users have been successfully removed.'),
        ),
      );
    } catch (e) {
      dispatch(showErrorResponse(e, translate('Unable to remove users.')));
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <ActionButton
      title={translate('Remove')}
      action={callback}
      iconNode={<Trash />}
      variant="danger"
      className="btn btn-danger"
      tooltip={translate('Remove all selected users from organization.')}
      disabled={isRemoving}
    />
  );
};
