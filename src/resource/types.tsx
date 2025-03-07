import { Quota } from '@waldur/quotas/types';
export { OpenStackPort as Port } from '@waldur/api';

export type ResourceState =
  | 'OK'
  | 'Erred'
  | 'Creation Scheduled'
  | 'Creating'
  | 'Update Scheduled'
  | 'Updating'
  | 'Deletion Scheduled'
  | 'Deleting';

export interface BaseResource {
  name: string;
  state: ResourceState;
  runtime_state?: string;
  uuid: string;
  url?: string;
  backend_id?: string;
  description?: string;
  service_name?: string;
  service_settings_uuid?: string;
  error_message?: string;
  created?: string;
  end_date?: string;
  modified?: string;
  marketplace_offering_uuid?: string;
  marketplace_offering_thumbnail?: string;
  marketplace_resource_uuid?: string;
  marketplace_category_uuid?: string;
  marketplace_category_name?: string;
  marketplace_category_icon?: string;
  project_uuid: string;
  quotas?: Quota[];
  resource_type?: string;
}

export interface Resource extends BaseResource {
  resource_type: string;
  service_settings_state: string;
  service_settings_error_message?: string;
  error_message?: string;
  action?: string;
  action_details?: any;
}
