import { createElement, FC, useMemo } from 'react';
import { connect } from 'react-redux';
import { isSubmitting, isValid } from 'redux-form';

import { defaultCurrency } from '@waldur/core/formatCurrency';
import { isFeatureVisible } from '@waldur/features/connect';
import { MarketplaceFeatures } from '@waldur/FeaturesEnums';
import { ORDER_FORM_ID } from '@waldur/marketplace/details/constants';
import { Offering } from '@waldur/marketplace/types';
import { Customer } from '@waldur/workspace/types';

import { DeployPageTotalCard } from '../deploy/DeployPageTotalCard';
import {
  formCustomerSelector,
  formErrorsSelector,
  formSubmitErrorsSelector,
} from '../deploy/utils';
import { orderFormDataSelector } from '../utils';

import { OrderSubmitButton } from './OrderSubmitButton';
import { OrderSummaryPlanRows } from './plan/OrderSummaryPlanRows';
import { PricesData } from './plan/types';
import { pricesSelector, useComponentsDetailPrices } from './plan/utils';
import { OfferingFormData, OrderSummaryProps } from './types';

export const SummaryTable: FC<OrderSummaryProps> = (props) => {
  return (
    <div className={props.onlyDetails ? 'fs-6' : 'mb-8 fs-6'}>
      {props.extraComponent ? createElement(props.extraComponent, props) : null}
      {props.formData && props.formData.plan && (
        <OrderSummaryPlanRows
          priceData={props.prices}
          customer={props.formData.customer}
          hasTotal={props.onlyDetails}
        />
      )}
    </div>
  );
};

const OrderCheckout: FC<OrderSummaryProps> = (props) => {
  const { periodic, oneTime } = useComponentsDetailPrices(props.prices);

  const monthlyPriceIndex = useMemo(() => {
    const index = props.prices.periodKeys.indexOf('monthly');
    return index > -1 ? index : 0;
  }, [props.prices.periodKeys]);

  const total =
    periodic.periodicTotal[monthlyPriceIndex] + oneTime.oneTimeTotal;

  return (
    <DeployPageTotalCard
      total={defaultCurrency(total || 0)}
      offering={props.offering}
    >
      <SummaryTable {...props} />
      <OrderSubmitButton {...props} />
    </DeployPageTotalCard>
  );
};

const PureOrderSummary: FC<OrderSummaryProps> = (props) =>
  props.onlyDetails ? (
    <SummaryTable {...props} />
  ) : (
    <OrderCheckout {...props} />
  );

interface OrderSummaryStateProps {
  customer: Customer;
  prices: PricesData;
  formData: OfferingFormData;
  formValid: boolean;
}

const mapStateToProps = (state, ownProps) => ({
  customer: formCustomerSelector(state),
  prices: pricesSelector(state, ownProps),
  formData: orderFormDataSelector(state),
  formValid: isValid(ORDER_FORM_ID)(state),
  errors: { ...formErrorsSelector(state), ...formSubmitErrorsSelector(state) },
  isSubmitting: isSubmitting(ORDER_FORM_ID)(state),
  shouldConcealPrices: isFeatureVisible(MarketplaceFeatures.conceal_prices),
});

export const OrderSummary = connect<
  OrderSummaryStateProps,
  {},
  { offering: Offering; onlyDetails?: boolean }
>(mapStateToProps)(PureOrderSummary);
