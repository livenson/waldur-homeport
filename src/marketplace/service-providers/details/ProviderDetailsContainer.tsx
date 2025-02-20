import { useQuery } from '@tanstack/react-query';
import { useCurrentStateAndParams } from '@uirouter/react';

import { marketplacePublicOfferingsList } from '@waldur/api';
import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { translate } from '@waldur/i18n';
import { getServiceProviderByCustomer } from '@waldur/marketplace/common/api';
import { Offering } from '@waldur/marketplace/types';

import { ServiceProviderDetails } from './ServiceProviderDetails';

async function loadProviderData(customerId) {
  const provider = await getServiceProviderByCustomer({
    customer_uuid: customerId,
  });
  const offerings = (
    await marketplacePublicOfferingsList({
      query: {
        customer_uuid: customerId,
        // @ts-ignore
        o: ['state'],
      },
    })
  ).data as any as Offering[];
  return { provider, offerings };
}

export const ProviderDetailsContainer: React.FC<{}> = () => {
  const {
    params: { customer_uuid },
  } = useCurrentStateAndParams();

  const { isLoading, error, data } = useQuery(
    ['ProviderDetailsContainer', customer_uuid],
    () => loadProviderData(customer_uuid),
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <>{translate('Unable to load service provider.')}</>;
  }
  return (
    <ServiceProviderDetails
      provider={data.provider}
      offerings={data.offerings}
    />
  );
};
