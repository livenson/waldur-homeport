export { Invoice, InvoiceItem } from '@waldur/api';
import { InvoiceItem } from '@waldur/api';
import { Offering, ServiceProvider } from '@waldur/marketplace/types';
import { Project } from '@waldur/workspace/types';

export interface InvoiceTableItem {
  resource_name: string;
  resource_uuid: string;
  offering_name: string;
  offering_uuid: string;
  project_name: string;
  project_uuid: string;
  service_provider_name: string;
  service_provider_uuid: string;
  plan_name: string;
  price: number;
  tax: number;
  total: number;
  items: InvoiceItem[];
}

export interface InvoiceItemsFilterData {
  provider: ServiceProvider;
  project: Project;
  offering: Offering;
}
