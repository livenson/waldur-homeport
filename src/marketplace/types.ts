import { InjectedFormProps } from 'redux-form';

import {
  CategoryGroup as WaldurCategoryGroup,
  MarketplaceCategory as WaldurCategory,
  BillingUnit,
  BillingTypeEnum,
  OrganizationGroup,
  OfferingOptions,
  GoogleCalendar,
  NestedScreenshot,
  NestedAttribute,
} from '@waldur/api';
import { OrderDetailsType } from '@waldur/marketplace/orders/types';
import { Quota } from '@waldur/quotas/types';
import { ResourceState } from '@waldur/resource/types';
import { Customer, Project } from '@waldur/workspace/types';

interface BaseComponent {
  type: string;
  name: string;
  measured_unit?: string;
  description?: string;
}

export interface OfferingComponent extends BaseComponent {
  billing_type: BillingTypeEnum;
  limit_period?: 'month' | 'annual' | 'total' | unknown;
  limit_amount?: number;
  max_value?: number;
  min_value?: number;
  factor?: number;
  is_boolean?: boolean;
  default_limit?: number;
  article_code?: string;
  uuid: string;
}

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

type OfferingState = 'Draft' | 'Active' | 'Paused' | 'Archived';

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

export interface Section {
  key: string;
  title: string;
  attributes: NestedAttribute[];
  is_standalone?: boolean;
}

export interface CategoryColumn {
  uuid?: string;
  index: number;
  title: string;
  attribute?: string;
  widget?: 'csv' | 'filesize' | 'attached_instance';
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

export interface OfferingsListType {
  items: Offering[];
  loaded: boolean;
  loading: boolean;
}

export interface ServiceProvider {
  customer_uuid: string;
  customer_name: string;
  name?: string;
  uuid: string;
  image?: string;
  customer_image?: string;
  description?: string;
  service_offerings?: Offering[];
  created: string;
  customer_abbreviation?: string;
  customer_country?: string;
  country?: string;
  country_name?: string;
  organizationGroup?: string;
  url?: string;
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
  order: OrderDetailsType;
  offering: Offering;
  limits?: string[];
}

export interface AttributesType {
  [key: string]: any;
}

export interface ImportableResource {
  backend_id: string;
  name: string;
  type: string;
  description: string;
}

export interface PlanComponent {
  amount: number;
  billing_type: BillingTypeEnum;
  component_name: string;
  measured_unit?: string;
  offering_name: string;
  plan_name: string;
  plan_unit: string;
  price?: string;
}
