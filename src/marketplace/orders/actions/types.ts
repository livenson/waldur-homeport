import { OrderDetails } from '@waldur/api';

export interface OrderActionProps {
  order: OrderDetails;
  refetch?(): void;
  as?: React.ElementType;
}
