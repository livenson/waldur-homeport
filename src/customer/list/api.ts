import { organizationGroupsList } from 'waldur-js-client';

import { ENV } from '@waldur/configs/default';
import { parseSelectData } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';

export const organizationGroupAutocomplete = async (
  query: string,
  prevOptions,
  { page },
) => {
  const response = await organizationGroupsList({
    query: {
      name: query,
      page: page,
      page_size: ENV.pageSize,
      o: 'name',
    },
  });
  return returnReactSelectAsyncPaginateObject(
    parseSelectData(response),
    prevOptions,
    page,
  );
};
