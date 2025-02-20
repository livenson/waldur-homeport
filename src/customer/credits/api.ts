import { getFirst } from '@waldur/core/api';

import { CustomerCredit, ProjectCredit } from './types';

export const getCustomerCredit = (customer_uuid: string) => {
  return getFirst<CustomerCredit>('/customer-credits/', { customer_uuid });
};

export const getProjectCredit = (project_uuid: string) => {
  return getFirst<ProjectCredit>('/project-credits/', { project_uuid });
};
