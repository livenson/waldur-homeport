import { invoicesList } from 'waldur-js-client';

import {
  getLineChartOptions,
  getLineChartOptionsWithAxis,
} from '@waldur/dashboard/chart';
import { Scope, Chart, InvoiceSummary } from '@waldur/dashboard/types';
import { formatCostChart, getTeamSizeChart } from '@waldur/dashboard/utils';
import { getActiveFixedPricePaymentProfile } from '@waldur/invoices/details/utils';

async function getCustomerCostChart(customer: Scope): Promise<Chart> {
  if (!getActiveFixedPricePaymentProfile(customer.payment_profiles)) {
    const invoices = await invoicesList({
      query: {
        customer: customer.url,
        page_size: 12,
        field: ['year', 'month', 'price'],
      },
    });
    const costChart = formatCostChart(invoices.data as any as InvoiceSummary[]);
    return costChart;
  }
  return null;
}

export async function getCustomerCostChartData(
  customer: Scope,
  withAxis = false,
) {
  const costChart = await getCustomerCostChart(customer);
  return costChart
    ? {
        chart: costChart,
        options: withAxis
          ? getLineChartOptionsWithAxis(costChart)
          : getLineChartOptions(costChart),
      }
    : null;
}

export const loadSummary = async (customer) => {
  const costChartData = await getCustomerCostChartData(customer);
  const teamChart = await getTeamSizeChart(customer);
  return {
    costChart: costChartData,
    teamChart: teamChart
      ? {
          chart: teamChart,
          options: getLineChartOptions(teamChart),
        }
      : null,
  };
};
