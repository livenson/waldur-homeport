import { FunctionComponent, useCallback } from 'react';

import { openstackInstancesRetrieve } from '@waldur/api';
import { translate } from '@waldur/i18n';
import { Port } from '@waldur/resource/types';
import Table from '@waldur/table/Table';
import { useTable } from '@waldur/table/useTable';

import { UpdateInternalIpsAction } from './actions/update-internal-ips/UpdateInternalIpsSetAction';
import { SetAllowedAddressPairsButton } from './SetAllowedAddressPairsButton';
import { formatAddressList } from './utils';

export const InternalIpsList: FunctionComponent<{ resourceScope; refetch }> = ({
  resourceScope,
  refetch,
}) => {
  const fetchData = useCallback(
    () =>
      openstackInstancesRetrieve({ path: { uuid: resourceScope.uuid } }).then(
        (vm) => ({
          rows: vm.data.ports,
          resultCount: vm.data.ports.length,
        }),
      ),
    [resourceScope],
  );
  const props = useTable({
    table: 'openstack-internal-ips',
    fetchData,
  });
  return (
    <Table<Port>
      {...props}
      columns={[
        {
          title: translate('IP address'),
          render: ({ row }) => <>{formatAddressList(row)}</>,
        },
        {
          title: translate('MAC address'),
          render: ({ row }) => <>{row.mac_address}</>,
        },
        {
          title: translate('Subnet name'),
          render: ({ row }) => <>{row.subnet_name}</>,
        },
        {
          title: translate('Subnet CIDR'),
          render: ({ row }) => <>{row.subnet_cidr}</>,
        },
        {
          title: translate('Actions'),
          render: ({ row }) => (
            <SetAllowedAddressPairsButton instance={resourceScope} port={row} />
          ),
        },
      ]}
      verboseName={translate('ports')}
      tableActions={
        <UpdateInternalIpsAction
          resource={resourceScope}
          refetch={() => {
            refetch();
            props.fetch();
          }}
        />
      }
    />
  );
};
