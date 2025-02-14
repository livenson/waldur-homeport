import { ENV } from '@waldur/configs/default';
import { get, getSelectData } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';
import { getStates } from '@waldur/marketplace/resources/list/ResourceStateFilter';
import { INSTANCE_TYPE, TENANT_TYPE } from '@waldur/openstack/constants';

import { SupportStatistics } from './types';

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
  let response = await getSelectData('/marketplace-resources/', {
    field: ['name', 'backend_id', 'project_name'],
    customer_uuid: customerId,
    name: query,
    o: ['project_name', 'name'],
    page: currentPage,
    page_size: ENV.pageSize,
    state: getStates().map((state) => state.value),
    offering_type: type,
  });
  response = {
    ...response,
    options: response.options.map(
      type === TENANT_TYPE
        ? tenantSerializer
        : type === INSTANCE_TYPE
          ? instanceSerializer
          : (o) => o,
    ),
  };

  return returnReactSelectAsyncPaginateObject(
    response,
    prevOptions,
    currentPage,
  );
};

const instanceSerializer = ({ name, backend_id, project_name }) => ({
  name: `${project_name} / ${name}`,
  value: `Instance UUID: ${backend_id}. Name: ${name}`,
});

export const getSupportStatistics = () =>
  get<SupportStatistics>(`/support-statistics/`).then(
    (response) => response.data,
  );
