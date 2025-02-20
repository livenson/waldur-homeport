import { get } from '@waldur/core/api';

import { CostsForPeriod } from './types';

export const fetchProjectCostsForPeriod = (
  projectUuid: string,
  period: number,
) =>
  get('/invoice-items/project_costs_for_period/', {
    params: {
      project_uuid: projectUuid,
      period,
    },
  }).then((response) => response.data as CostsForPeriod);

export const fetchCustomerCostsForPeriod = (
  customerUuid: string,
  period: number,
) =>
  get('/invoice-items/customer_costs_for_period/', {
    params: {
      customer_uuid: customerUuid,
      period,
    },
  }).then((response) => response.data as CostsForPeriod);
