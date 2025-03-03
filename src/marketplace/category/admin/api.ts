import { getAll } from '@waldur/core/api';

export const getCategoryColumns = (params) =>
  getAll<any>(`/marketplace-category-columns/`, { params });
