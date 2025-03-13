import {
  marketplaceResourcesList,
  MarketplaceResourcesListData,
} from 'waldur-js-client';

import { ENV } from '@waldur/configs/default';
import { parseSelectData } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';
import { getStates } from '@waldur/marketplace/resources/list/ResourceStateFilter';
import { INSTANCE_TYPE, TENANT_TYPE } from '@waldur/openstack/constants';

const tenantSerializer = ({ name, backend_id, project_name }) => ({
  name: `${project_name} / ${name}`,
  value: `Tenant UUID: ${backend_id}. Name: ${name}`,
});

export const fetchOpenstackOptions = async (
  query,
  type,
  prevOptions,
  currentPage: number,
  customerId,
) => {
  const response = await marketplaceResourcesList({
    query: {
      field: ['name', 'backend_id', 'project_name'],
      customer_uuid: customerId,
      name: query,
      o: ['project_name', 'name'],
      page: currentPage,
      page_size: ENV.pageSize,
      state: getStates().map(
        (state) => state.value,
      ) as MarketplaceResourcesListData['query']['state'],
      offering_type: type,
    },
  });
  const selectData = parseSelectData(response);
  return returnReactSelectAsyncPaginateObject(
    {
      totalItems: selectData.totalItems,
      options: selectData.options.map(
        type === TENANT_TYPE
          ? tenantSerializer
          : type === INSTANCE_TYPE
            ? instanceSerializer
            : (o) => o,
      ),
    },
    prevOptions,
    currentPage,
  );
};

const instanceSerializer = ({ name, backend_id, project_name }) => ({
  name: `${project_name} / ${name}`,
  value: `Instance UUID: ${backend_id}. Name: ${name}`,
});
