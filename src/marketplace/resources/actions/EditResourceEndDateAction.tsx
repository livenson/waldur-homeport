import { CalendarBlank } from '@phosphor-icons/react';
import { useSelector, useDispatch } from 'react-redux';
import { marketplaceResourcesPartialUpdate } from 'waldur-js-client';

import { lazyComponent } from '@waldur/core/lazyComponent';
import { translate } from '@waldur/i18n';
import { openModalDialog } from '@waldur/modal/actions';
import { PermissionEnum } from '@waldur/permissions/enums';
import { hasPermission } from '@waldur/permissions/hasPermission';
import { ActionItem } from '@waldur/resource/actions/ActionItem';
import { ActionItemType } from '@waldur/resource/actions/types';
import { getUser } from '@waldur/workspace/selectors';

const EditResourceEndDateDialog = lazyComponent(() =>
  import('./EditResourceEndDateDialog').then((module) => ({
    default: module.EditResourceEndDateDialog,
  })),
);

export const EditResourceEndDateAction: ActionItemType = ({
  resource,
  refetch,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const callback = () =>
    dispatch(
      openModalDialog(EditResourceEndDateDialog, {
        resolve: {
          resource,
          refetch,
          updateEndDate: (uuid, end_date) =>
            marketplaceResourcesPartialUpdate({
              path: { uuid },
              body: { end_date },
            }),
        },
        size: 'md',
      }),
    );

  if (
    !hasPermission(user, {
      permission: PermissionEnum.SET_RESOURCE_END_DATE,
      customerId: resource.offering_customer_uuid,
    }) &&
    !hasPermission(user, {
      permission: PermissionEnum.SET_RESOURCE_END_DATE,
      customerId: resource.customer_uuid,
    })
  ) {
    return null;
  }
  return (
    <ActionItem
      title={translate('Set termination date')}
      action={callback}
      iconNode={<CalendarBlank weight="bold" />}
    />
  );
};
