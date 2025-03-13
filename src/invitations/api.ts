import { rolesList } from 'waldur-js-client';

import { ENV } from '@waldur/configs/default';
import { parseSelectData } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';

export const roleAutocomplete = async (
  query: string,
  prevOptions,
  { page },
) => {
  const response = await rolesList({
    query: {
      name: query,
      page: page,
      page_size: ENV.pageSize,
      field: ['uuid', 'name', 'description'],
    },
  });
  return returnReactSelectAsyncPaginateObject(
    parseSelectData(response),
    prevOptions,
    page,
  );
};
