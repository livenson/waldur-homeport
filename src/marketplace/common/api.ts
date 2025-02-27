import Axios, { AxiosRequestConfig } from 'axios';

import { OrganizationGroup } from '@waldur/api';
import { ENV } from '@waldur/configs/default';
import {
  get,
  getAll,
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

import { PlanUsageRow } from '../../reporting/plan-usage/types';
import {
  ComponentUsage,
  ComponentUserUsage,
  ResourcePlanPeriod,
} from '../resources/usage/types';

export const getCategoryGroups = (options?: AxiosRequestConfig) =>
  getAll<CategoryGroup>('/marketplace-category-groups/', options);

export const getCategories = (options?: AxiosRequestConfig) =>
  getAll<Category>('/marketplace-categories/', options);

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

export const getProviderResourcePlanPeriods = (resourceId: string) =>
  getAll<ResourcePlanPeriod>(
    `/marketplace-provider-resources/${resourceId}/plan_periods/`,
  );

export const getSubResourcesOfferings = (resourceId: string) =>
  getAll<{ uuid; type }>(
    `/marketplace-resources/${resourceId}/offering_for_subresources/`,
  );

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

export const getRuntimeStates = (projectUuid?, categoryUuid?) => {
  let url = '/marketplace-runtime-states/';

  if (projectUuid) {
    url += projectUuid + '/';
  }

  return get(url, {
    params: { category_uuid: categoryUuid },
  }).then((response) => response.data);
};

export const getServiceProviderByCustomer = async (params, options?) => {
  const response = await get<ServiceProvider>(
    '/marketplace-service-providers/',
    { ...options, params },
  );
  return (response.data[0] as ServiceProvider) ?? null;
};

export const getServiceProviderSecretCode = (id) =>
  get<{ api_secret_code: string }>(
    `/marketplace-service-providers/${id}/api_secret_code/`,
  ).then((response) => response.data);

export const generateServiceProviderSecretCode = (id) =>
  post<{ api_secret_code: string }>(
    `/marketplace-service-providers/${id}/api_secret_code/`,
  ).then((response) => response.data);

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
