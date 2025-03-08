export { OrderDetails as OrderResponse } from '@waldur/api';

export type OrderState =
  | 'pending-consumer'
  | 'pending-provider'
  | 'executing'
  | 'done'
  | 'canceled'
  | 'erred'
  | 'rejected';
