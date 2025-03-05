import { PencilSimple } from '@phosphor-icons/react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { RoleModifyRequest, rolesUpdate } from '@waldur/api';
import { ENV } from '@waldur/configs/default';
import { lazyComponent } from '@waldur/core/lazyComponent';
import { translate } from '@waldur/i18n/translate';
import { closeModalDialog, openModalDialog } from '@waldur/modal/actions';
import { ActionItem } from '@waldur/resource/actions/ActionItem';

import { getRoles } from './api';

const RoleEditDialog = lazyComponent(() =>
  import('./RoleEditDialog').then((module) => ({
    default: module.RoleEditDialog,
  })),
);

export const RoleEditButton = ({ row, refetch }) => {
  const dispatch = useDispatch();
  const openRoleEditDialog = useCallback(
    () =>
      dispatch(
        openModalDialog(RoleEditDialog, {
          resolve: {
            row,
          },
          onSubmit: async (formData: RoleModifyRequest) => {
            await rolesUpdate({ path: { uuid: row.uuid }, body: formData });
            ENV.roles = await getRoles();
            dispatch(closeModalDialog());
            refetch();
          },
          onCancel: () => {
            dispatch(closeModalDialog());
          },
        }),
      ),
    [dispatch],
  );

  return (
    <ActionItem
      title={translate('Edit role')}
      iconNode={<PencilSimple />}
      action={openRoleEditDialog}
    />
  );
};
