import { OrderDetails } from '@waldur/api';
import { translate } from '@waldur/i18n';

import { OrderState } from '../types';

export const OrderStateCell = ({ row }: { row: OrderDetails }) => (
  <>
    {
      (
        {
          'pending-consumer': translate('Pending consumer approval'),
          'pending-provider': translate('Pending provider approval'),
          'pending-project': translate('Pending project start'),
          executing: translate('Executing'),
          done: translate('Done'),
          erred: translate('Erred'),
          canceled: translate('Canceled'),
          rejected: translate('Rejected'),
        } as Record<OrderState, string>
      )[row.state]
    }
  </>
);
