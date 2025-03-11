import { PublicOfferingDetails } from '@waldur/api';
import { Project } from '@waldur/api';
import { Offering, Plan } from '@waldur/marketplace/types';

import { PricesData } from './plan/types';

export interface Limits {
  [key: string]: number;
}

export interface OfferingFormData {
  plan?: Plan;
  attributes?: { [key: string]: any };
  project?: Project;
  limits?: Limits;
  customer?: any;
}

export interface OrderSummaryProps {
  offering: PublicOfferingDetails;
  prices?: PricesData;
  formData: OfferingFormData;
  formValid?: boolean;
  errors?: any;
  isSubmitting?: boolean;
  updateMode?: boolean;
  extraComponent?: React.ComponentType<any>;
  shouldConcealPrices?: boolean;
  onlyDetails?: boolean;
}
export interface PureOfferingConfiguratorProps {
  offering: Offering;
  project?: Project;
  plan?: Plan;
  limits: string[];
}
