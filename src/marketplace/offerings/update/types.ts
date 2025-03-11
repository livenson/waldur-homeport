import { ProviderOfferingDetails } from '@waldur/api';

export interface OfferingSectionProps {
  offering: ProviderOfferingDetails;
  refetch;
  loading;
}
