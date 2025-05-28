import { FC } from 'react';

import { ActionsDropdown } from '@waldur/table/ActionsDropdown';

import { ServiceAccountDeleteAction } from './ServiceAccountDeleteAction';
import { ServiceAccountEditAction } from './ServiceAccountEditAction';
import { ServiceAccountRotateApiKeyAction } from './ServiceAccountRotateApiKeyAction';
import { ServiceAccountsProps } from './type';

export const ServiceAccountActions: FC<
  ServiceAccountsProps & { row; refetch; admin?: boolean }
> = ({ context, scope, row, refetch, admin }) => {
  return (
    <ActionsDropdown
      row={row}
      refetch={refetch}
      data={{ context, scope }}
      actions={
        admin
          ? [ServiceAccountRotateApiKeyAction]
          : [
              ServiceAccountEditAction,
              ServiceAccountRotateApiKeyAction,
              ServiceAccountDeleteAction,
            ]
      }
      data-cy="service-account-actions-dropdown-btn"
    />
  );
};
