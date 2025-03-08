import { InjectedFormProps } from 'redux-form';

import {
  CategoryGroup as WaldurCategoryGroup,
  MarketplaceCategory as WaldurCategory,
  BillingUnit,
  OrganizationGroup,
  OrderDetails,
  PublicOfferingDetails as Offering,
  PublicOfferingDetails,
} from '@waldur/api';
import { Customer, Project } from '@waldur/workspace/types';

export {
  OfferingComponent,
  ServiceProvider,
  CategoryColumn,
  ProviderOfferingDetails as Offering,
} from '@waldur/api';

export interface Plan {
  url: string;
  uuid?: string;
  name: string;
  description?: string;
  unit_price?: number | string;
  init_price?: number | string;
  switch_price?: number | string;
  unit?: BillingUnit;
  quotas: { [key: string]: number };
  prices: { [key: string]: number };
  future_prices?: { [key: string]: number };
  resources_count?: number;
  is_active: boolean;
  archived?: boolean;
  price?: number;
  plan_type: string;
  organization_groups: OrganizationGroup[];
}

export interface CategoryGroup extends WaldurCategoryGroup {
  /** generated on frontend side */
  categories?: Category[];
  offering_count?: number;
  resource_count?: number;
}

export interface Category extends WaldurCategory {
  /** generated on frontend side */
  resource_count?: number;
}

export interface OfferingConfigurationFormProps extends InjectedFormProps {
  offering: Offering;
  project?: Project;
  plan?: Plan;
  initialLimits?: AttributesType;
  customer?: Customer;
  limits: string[];
  previewMode?: boolean;
}

export interface OrderDetailsProps {
  order: OrderDetails;
  offering: PublicOfferingDetails;
  limits?: string[];
}

export interface AttributesType {
  [key: string]: any;
}
