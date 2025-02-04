import React from 'react';

import { translate } from '@waldur/i18n';
import { MetronicModalDialog } from '@waldur/modal/MetronicModalDialog';

import { getCheckoutSummaryComponent } from '../common/registry';
import { Offering } from '../types';

import { OrderSummary } from './OrderSummary';

interface OrderSummaryDialogProps {
  offering: Offering;
}

export const OrderSummaryDialog: React.FC<OrderSummaryDialogProps> = (
  props,
) => {
  const CheckoutSummaryComponent =
    getCheckoutSummaryComponent(props.offering.type) || OrderSummary;

  return (
    <MetronicModalDialog
      title={translate('Summary')}
      subtitle={translate(
        'Review the details of your order, before confirming',
      )}
      closeButton
    >
      <CheckoutSummaryComponent offering={props.offering} onlyDetails />
    </MetronicModalDialog>
  );
};
