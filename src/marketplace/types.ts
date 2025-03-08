import { InjectedFormProps } from 'redux-form';

import {
  CategoryGroup as WaldurCategoryGroup,
  MarketplaceCategory as WaldurCategory,
  BillingUnit,
  OrganizationGroup,
  OfferingOptions,
  GoogleCalendar,
  NestedScreenshot,
  OfferingComponent,
  OfferingState,
  OrderDetails,
} from '@waldur/api';
import { CoreStates as ResourceState } from '@waldur/api';
import { Quota } from '@waldur/quotas/types';
import { Customer, Project } from '@waldur/workspace/types';

export {
  OfferingComponent,
  ServiceProvider,
  CategoryColumn,
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

export interface Offering {
  latitude: number;
  longitude: number;
  scope_state?: ResourceState;
  quotas?: Quota[];
  uuid?: string;
  url?: string;
  thumbnail?: string;
  name: string;
  backend_id?: string;
  terms_of_service?: string;
  terms_of_service_link?: string;
  privacy_policy_link?: string;
  access_url?: string;
  roles?: any[];
  order_count: number;
  category?: string;
  category_title?: string;
  category_uuid?: string;
  vendor_details?: string;
  screenshots?: NestedScreenshot[];
  description?: string;
  full_description?: string;
  customer_uuid?: string;
  customer_name?: string;
  customer_image?: string;
  project?: string;
  project_name?: string;
  project_uuid?: string;
  attributes: AttributesType;
  components: OfferingComponent[];
  options?: OfferingOptions;
  resource_options?: OfferingOptions;
  plugin_options?: Record<string, any>;
  secret_options?: Record<string, any>;
  service_attributes?: Record<string, any>;
  plans?: Plan[];
  type: string;
  state: OfferingState;
  scope?: string;
  scope_uuid?: string;
  scope_name?: string;
  created?: string;
  shared?: boolean;
  billable?: boolean;
  paused_reason?: string;
  datacite_doi?: string;
  citation_count?: number;
  google_calendar_is_public: boolean;
  google_calendar_link?: string;
  image?: string;
  googlecalendar?: GoogleCalendar;
  organization_groups: OrganizationGroup[];
  parent_description?: string;
  parent_name?: string;
  parent_uuid?: string;
  getting_started?: string;
  integration_status: any;
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
  offering: Offering;
  limits?: string[];
}

export interface AttributesType {
  [key: string]: any;
}
