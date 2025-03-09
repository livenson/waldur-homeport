import { DateTime } from 'luxon';

import {
  ComponentUsage,
  marketplaceComponentUserUsagesList,
  marketplaceProviderOfferingsRetrieve,
  marketplaceProviderResourcesPlanPeriodsList,
  marketplaceResourcesOfferingRetrieve,
  OfferingComponent,
  PublicOfferingDetails,
} from '@waldur/api';
import { getAllPages } from '@waldur/core/api';
import { formatDateTime, parseDate } from '@waldur/core/dateUtils';
import { getComponentUsages } from '@waldur/marketplace/common/api';

import { ResourcePlanPeriod, UsageReportContext } from './types';

export const getPeriodLabel = (
  period: Pick<ResourcePlanPeriod, 'start' | 'end' | 'plan_name'>,
) => {
  const startOfMonth = DateTime.now().startOf('month');
  const start =
    startOfMonth.diff(parseDate(period.start)).as('milliseconds') > 0
      ? formatDateTime(startOfMonth)
      : formatDateTime(period.start);
  const end = period.end && formatDateTime(period.end);
  if (end) {
    return `${period.plan_name} (from ${start} to ${end})`;
  } else {
    return `${period.plan_name} (from ${start})`;
  }
};

export const getProviderUsageComponents = async (
  params: UsageReportContext,
) => {
  let components = null;
  if (params.offering_uuid) {
    const offering = await marketplaceProviderOfferingsRetrieve({
      path: { uuid: params.offering_uuid },
    }).then((response) => response.data);
    components = getUsageBasedOfferingComponents(offering.components);
  }
  const periods = await marketplaceProviderResourcesPlanPeriodsList({
    path: { uuid: params.resource_uuid },
  }).then((r) => r.data);
  const options =
    periods.length > 0
      ? periods.map((period) => ({
          // @ts-ignore
          label: getPeriodLabel(period),
          value: period,
        }))
      : [
          {
            label: 'Default plan',
          },
        ];
  return {
    components,
    periods: options,
  };
};

const getUsageBasedOfferingComponents = (components: OfferingComponent[]) => {
  return components
    .filter((component) =>
      // Allow to report usage for limit-based components
      ['usage', 'limit'].includes(component.billing_type),
    )
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const getComponentsAndUsages = async (
  resource_uuid: string,
  months: number,
) => {
  if (!resource_uuid) {
    return { components: null, usages: null, userUsages: null };
  }

  let offering: PublicOfferingDetails;
  try {
    offering = await marketplaceResourcesOfferingRetrieve({
      path: { uuid: resource_uuid },
    }).then((response) => response.data);
  } catch (error) {
    throw new Error(`Error while getting offering, ${error.message}`);
  }

  const components = getUsageBasedOfferingComponents(offering.components);

  const date_after = months
    ? DateTime.now().startOf('month').minus({ months }).toFormat('yyyy-MM-dd')
    : undefined;

  let usages: ComponentUsage[];
  let userUsages;
  try {
    usages = await getComponentUsages(resource_uuid, date_after, {
      field: ['type', 'usage', 'billing_period'],
    });
    userUsages = await getAllPages((page) =>
      marketplaceComponentUserUsagesList({
        query: {
          page,
          resource_uuid,
          date_after,
          field: ['component_type', 'usage', 'billing_period'],
        },
      }),
    );
  } catch (error) {
    throw new Error(
      `Error while getting usages for resource: ${resource_uuid}, ${error.message}`,
    );
  }

  return { components, usages, userUsages };
};
