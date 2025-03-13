import { broadcastMessageTemplatesList } from 'waldur-js-client';

import { ENV } from '@waldur/configs/default';
import { parseSelectData } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';

export const templateAutocomplete = async (
  query: string,
  prevOptions,
  page,
) => {
  const response = await broadcastMessageTemplatesList({
    query: {
      name: query,
      page: page,
      page_size: ENV.pageSize,
    },
  });
  return returnReactSelectAsyncPaginateObject(
    parseSelectData(response),
    prevOptions,
    page,
  );
};
