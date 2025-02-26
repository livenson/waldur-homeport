import { FC } from 'react';

import { formatDate } from '@waldur/core/dateUtils';
import { translate } from '@waldur/i18n';
import { GenericPermission } from '@waldur/permissions/types';
import { ActionsDropdownComponent } from '@waldur/table/ActionsDropdown';
import { DASH_ESCAPE_CODE } from '@waldur/table/constants';
import Table from '@waldur/table/Table';
import { RoleField } from '@waldur/user/affiliations/RoleField';

import { UserRemoveButton } from './UserRemoveButton';

interface UsersListProps {
  table;
  scope;
  hideRole?: boolean;
  readOnly?: boolean;
  tableFooter?;
  cardBordered?: boolean;
  hasActionBar?: boolean;
}

export const UsersList: FC<UsersListProps> = ({
  table,
  scope,
  hideRole,
  readOnly,
  tableFooter,
  cardBordered,
  hasActionBar,
}) => {
  const columns = [
    {
      title: translate('Name'),
      render: ({ row }) => <>{row.user_full_name || row.user_username}</>,
    },
    {
      title: translate('Mail'),
      render: ({ row }) => <>{row.user_email}</>,
    },
  ];
  if (!hideRole) {
    columns.push({
      title: translate('Role'),
      render: RoleField,
    });
  }
  columns.push({
    title: translate('Role expiration'),
    render: ({ row }) => (
      <>
        {row.expiration_time
          ? formatDate(row.expiration_time)
          : DASH_ESCAPE_CODE}
      </>
    ),
  });
  return (
    <Table<GenericPermission>
      {...table}
      className="mb-7"
      columns={columns}
      title={translate('Users')}
      verboseName={translate('users')}
      cardBordered={cardBordered}
      hasActionBar={hasActionBar}
      minHeight="auto"
      rowActions={
        readOnly
          ? null
          : ({ row }) => (
              <ActionsDropdownComponent>
                <UserRemoveButton
                  permission={row}
                  refetch={table.fetch}
                  scope={scope}
                />
              </ActionsDropdownComponent>
            )
      }
      footer={tableFooter}
    />
  );
};
