import { customersRetrieve } from 'waldur-js-client';

import { Customer } from '@waldur/workspace/types';

export const getCustomer = (customerId: string) =>
  customersRetrieve({ path: { uuid: customerId } }).then(
    (r) => r.data as any as Customer,
  );
