import { getAll } from '@waldur/core/api';
import { Resource } from '@waldur/resource/types';

export const getMarketplaceResources = (params) =>
  getAll<Resource[]>(`/marketplace-resources/`, { params });
