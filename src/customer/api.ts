import { customersRetrieve } from '@waldur/api';
import { Customer } from '@waldur/workspace/types';

export const getCustomer = (customerId: string) =>
  customersRetrieve({ path: { uuid: customerId } }).then(
    (r) => r.data as any as Customer,
  );
