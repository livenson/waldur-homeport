import Axios, { AxiosRequestConfig } from 'axios';

import { OrganizationGroup } from '@waldur/api';
import { ENV } from '@waldur/configs/default';
import {
  get,
  getAll,
  getById,
  getFirst,
  getSelectData,
  parseResultCount,
  post,
  put,
  sendForm,
} from '@waldur/core/api';
import {
  Category,
  CategoryGroup,
  Offering,
  OfferingPermission,
  ServiceProvider,
} from '@waldur/marketplace/types';
import { Customer, Project } from '@waldur/workspace/types';

import { PlanUsageRow } from '../../reporting/plan-usage/types';
import { Resource } from '../resources/types';
import {
  ComponentUsage,
  ComponentUserUsage,
  ResourcePlanPeriod,
} from '../resources/usage/types';

export const getCategoryGroups = (options?: AxiosRequestConfig) =>
  getAll<CategoryGroup>('/marketplace-category-groups/', options);

export const getCategories = (options?: AxiosRequestConfig) =>
  getAll<Category>('/marketplace-categories/', options);

export const getCategoryOptions = (options?: {}) =>
  getSelectData<Category>('/marketplace-categories/', options);

export const getComponentUsages = (
  resource_uuid: string,
  date_after?: string,
  params?: {},
) =>
  getAll<ComponentUsage>('/marketplace-component-usages/', {
    params: { resource_uuid, date_after, ...params },
  });

export const getComponentUserUsages = (
  resource_uuid: string,
  date_after?: string,
  params?: {},
) =>
  getAll<ComponentUserUsage>('/marketplace-component-user-usages/', {
    params: { resource_uuid, date_after, ...params },
  });

export const getProviderOfferingsOptions = (params?: {}) =>
  getSelectData<Offering>('/marketplace-provider-offerings/', params);

export const getPublicOfferingsOptions = (params?: {}) =>
  getSelectData<Offering>('/marketplace-public-offerings/', params);

const getAllProviderOfferings = (options?: {}) =>
  getAll<Offering>('/marketplace-provider-offerings/', options);

export const getAllOfferingPermissions = (options?: AxiosRequestConfig) =>
  getAll<OfferingPermission>('/marketplace-offering-permissions/', options);

export const getProviderOfferings = (customerUuid: string) =>
  getAllProviderOfferings({ params: { customer_uuid: customerUuid } });

export const updatePlan = (planId, data) =>
  put(`/marketplace-plans/${planId}/`, data);

export const getOfferingPlansUsage = (offeringUuid: string) =>
  getAll<PlanUsageRow>('/marketplace-plans/usage_stats/', {
    params: { offering_uuid: offeringUuid },
  });

export const getProviderOffering = (id: string, options?: AxiosRequestConfig) =>
  getById<Offering>('/marketplace-provider-offerings/', id, options);

export const getProviderOfferingGLAuthConfig = (uuid: string) =>
  get(`/marketplace-provider-offerings/${uuid}/glauth_users_config/`).then(
    (response) => response.data,
  );

export const getPublicOffering = (id: string, options?: AxiosRequestConfig) =>
  getById<Offering>('/marketplace-public-offerings/', id, options);

export const getResourceDetails = (resourceId: string) =>
  get<any>(`/marketplace-resources/${resourceId}/details/`).then(
    (response) => response.data,
  );

export const getResourceTeam = (resourceId: string) =>
  getAll<any>(`/marketplace-resources/${resourceId}/team/`);

export const getProviderResourcePlanPeriods = (resourceId: string) =>
  getAll<ResourcePlanPeriod>(
    `/marketplace-provider-resources/${resourceId}/plan_periods/`,
  );

export const getSubResourcesOfferings = (resourceId: string) =>
  getAll<{ uuid; type }>(
    `/marketplace-resources/${resourceId}/offering_for_subresources/`,
  );

export const updateOfferingOptions = (offeringId, data) =>
  post(`/marketplace-provider-offerings/${offeringId}/update_options/`, data);

export const updateOfferingResourceOptions = (offeringId, data) =>
  post(
    `/marketplace-provider-offerings/${offeringId}/update_resource_options/`,
    data,
  );

export const removeProviderOfferingComponent = (offeringId, data) =>
  post(
    `/marketplace-provider-offerings/${offeringId}/remove_offering_component/`,
    data,
  );

export const createProviderOfferingComponent = (offeringId, data) =>
  post(
    `/marketplace-provider-offerings/${offeringId}/create_offering_component/`,
    data,
  );

export const updateOfferingComponent = (offeringId, data) =>
  post(
    `/marketplace-provider-offerings/${offeringId}/update_offering_component/`,
    data,
  );

export const updateOfferingSecretOptions = (offeringId, data) =>
  post(
    `/marketplace-provider-offerings/${offeringId}/update_integration/`,
    data,
  );

export const createOrder = (payload) => post(`/marketplace-orders/`, payload);

export const cancelOrder = (id) => post(`/marketplace-orders/${id}/cancel/`);

export const approveOrderByConsumer = (orderUuid: string) =>
  post(`/marketplace-orders/${orderUuid}/approve_by_consumer/`).then(
    (response) => response.data,
  );

export const rejectOrderByConsumer = (orderUuid: string) =>
  post(`/marketplace-orders/${orderUuid}/reject_by_consumer/`).then(
    (response) => response.data,
  );

export const cancelTerminationOrder = (id) =>
  post(`/remote-waldur-api/cancel_termination/${id}/`);

export const getCustomerList = (params?: {}) =>
  getSelectData<Customer>('/customers/', params);

export const getProjectList = (params?: {}) =>
  getSelectData<Project>('/projects/', params);

export const getOrganizationGroupList = (params?: {}) =>
  getSelectData('/organization-groups/', params);

export const getAllOrganizationGroups = (options?) =>
  getAll<OrganizationGroup>('/organization-groups/', options);

export const updateOfferingState = (offeringUuid, action, reason) =>
  post(
    `/marketplace-provider-offerings/${offeringUuid}/${action}/`,
    reason && { paused_reason: reason },
  ).then((response) => response.data);

export const uploadOfferingImage = (formData, offering) => {
  const reqData = {
    image: formData.image,
    name: formData.name,
    description: formData.description,
    offering: offering.url,
  };
  return sendForm(
    'POST',
    `${ENV.apiEndpoint}api/marketplace-screenshots/`,
    reqData,
  );
};

export const getServiceProviderList = (params?: {}) =>
  getSelectData<ServiceProvider>('/marketplace-service-providers/', params);

export const getUsers = (params?: {}) => getSelectData('/users/', params);

export const getRuntimeStates = (projectUuid?, categoryUuid?) => {
  let url = '/marketplace-runtime-states/';

  if (projectUuid) {
    url += projectUuid + '/';
  }

  return get(url, {
    params: { category_uuid: categoryUuid },
  }).then((response) => response.data);
};

export const getServiceProviderByCustomer = (params, options?) =>
  getFirst<ServiceProvider>('/marketplace-service-providers/', params, options);

export const getServiceProviderSecretCode = (id) =>
  get<{ api_secret_code: string }>(
    `/marketplace-service-providers/${id}/api_secret_code/`,
  ).then((response) => response.data);

export const generateServiceProviderSecretCode = (id) =>
  post<{ api_secret_code: string }>(
    `/marketplace-service-providers/${id}/api_secret_code/`,
  ).then((response) => response.data);

export const submitUsageReport = (payload) =>
  post(`/marketplace-component-usages/set_usage/`, payload).then(
    (response) => response.data,
  );

export const getResource = (id: string, options?: AxiosRequestConfig) =>
  getById<Resource>('/marketplace-resources/', id, options);

export const terminateResource = (resource_uuid: string, data?) =>
  post(`/marketplace-resources/${resource_uuid}/terminate/`, data).then(
    (response) => response.data,
  );

export const moveResource = (resourceUuid: string, projectUrl: string) =>
  post(`/marketplace-resources/${resourceUuid}/move_resource/`, {
    project: {
      url: projectUrl,
    },
  });

export const importResource = ({ offering_uuid, ...payload }) =>
  post<Resource>(
    `/marketplace-provider-offerings/${offering_uuid}/import_resource/`,
    payload,
  ).then((response) => response.data);

export const updateOfferingOverview = (offeringId, data) =>
  post(`/marketplace-provider-offerings/${offeringId}/update_overview/`, data);

export const updateOfferingDescription = (offeringId, data) =>
  post(
    `/marketplace-provider-offerings/${offeringId}/update_description/`,
    data,
  );

export const getAsyncDryRun = (uuid) =>
  get(`/marketplace-script-async-dry-run/${uuid}/`);

export const updateOfferingLogo = (offeringUuid: string, formData) =>
  sendForm(
    'POST',
    `${ENV.apiEndpoint}api/marketplace-provider-offerings/${offeringUuid}/update_thumbnail/`,
    {
      thumbnail: formData.images,
    },
  );

export const pullRemoteOfferingOrders = (uuid) =>
  post(`/remote-waldur-api/pull_offering_orders/${uuid}/`);

export const pullRemoteOfferingInvoices = (uuid) =>
  post(`/remote-waldur-api/pull_offering_invoices/${uuid}/`);

export const pullRemoteOfferingRobotAccounts = (uuid) =>
  post(`/remote-waldur-api/pull_offering_robot_accounts/${uuid}/`);

export const countOrders = (params) =>
  Axios.request({
    method: 'HEAD',
    url: ENV.apiEndpoint + 'api/marketplace-orders/',
    params,
  }).then(parseResultCount);

export const countRobotAccounts = (params) =>
  Axios.request({
    method: 'HEAD',
    url: ENV.apiEndpoint + 'api/marketplace-robot-accounts/',
    params,
  }).then(parseResultCount);

export const countLexisLinks = (params?) =>
  Axios.request({
    method: 'HEAD',
    url: ENV.apiEndpoint + 'api/lexis-links/',
    params,
  }).then(parseResultCount);

export const syncCustomScriptResource = (payload) =>
  post(`/marketplace-script-sync-resource/`, payload);
