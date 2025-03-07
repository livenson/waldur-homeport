import Axios from 'axios';

import {
  marketplaceChecklistsCategoriesList,
  marketplaceChecklistsCategoriesChecklistsList,
  marketplaceChecklistsList,
} from '@waldur/api';
import { ENV } from '@waldur/configs/default';
import { getAllPages, parseResultCount } from '@waldur/core/api';

export const getCategories = () =>
  getAllPages((page) =>
    marketplaceChecklistsCategoriesList({ query: { page } }),
  );

export const getChecklists = (category_uuid?: string) =>
  getAllPages((page) =>
    category_uuid
      ? marketplaceChecklistsCategoriesChecklistsList({
          path: { category_uuid },
          query: { page },
        })
      : marketplaceChecklistsList({ query: { page } }),
  );

export const countChecklists = () =>
  Axios.request({
    method: 'HEAD',
    url: ENV.apiEndpoint + 'api/marketplace-checklists/',
  }).then(parseResultCount);
