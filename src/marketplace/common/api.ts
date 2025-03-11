import Axios from 'axios';

import {
  marketplaceCategoriesList,
  marketplaceCategoryGroupsList,
  MarketplaceCategoryGroupsListData,
  marketplaceComponentUsagesList,
  MarketplaceComponentUsagesListData,
  marketplaceProviderResourcesOfferingForSubresourcesList,
  marketplaceServiceProvidersList,
  MarketplaceServiceProvidersListData,
} from '@waldur/api';
import { ENV } from '@waldur/configs/default';
import { getAllPages, parseResultCount, post } from '@waldur/core/api';
import { ServiceProvider } from '@waldur/marketplace/types';

export const getCategoryGroups = (
  query?: MarketplaceCategoryGroupsListData['query'],
) =>
  getAllPages((page) =>
    marketplaceCategoryGroupsList({ query: { page, ...query } }),
  );

export const getCategories = () =>
  getAllPages((page) => marketplaceCategoriesList({ query: { page } }));

export const getComponentUsages = (
  resource_uuid: string,
  date_after?: string,
  query?: MarketplaceComponentUsagesListData['query'],
) =>
  getAllPages((page) =>
    marketplaceComponentUsagesList({
      query: { page, resource_uuid, date_after, ...query },
    }),
  );

export const getSubResourcesOfferings = (uuid: string) =>
  marketplaceProviderResourcesOfferingForSubresourcesList({
    path: { uuid },
  }).then((r) => r.data);

export const updateOfferingState = (offeringUuid, action, reason) =>
  post(
    `/marketplace-provider-offerings/${offeringUuid}/${action}/`,
    reason && { paused_reason: reason },
  ).then((response) => response.data);

export const getServiceProviderByCustomer = async (
  query: MarketplaceServiceProvidersListData['query'],
) => {
  const response = await marketplaceServiceProvidersList({ query });
  return (response.data[0] as ServiceProvider) ?? null;
};

export const moveResource = (resourceUuid: string, projectUrl: string) =>
  post(`/marketplace-resources/${resourceUuid}/move_resource/`, {
    project: {
      url: projectUrl,
    },
  });

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
