import Axios from 'axios';
import { customersUsersList, CustomersUsersListData } from 'waldur-js-client';

import { ENV } from '@waldur/configs/default';
import { fixURL, parseResultCount, parseSelectData } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';

export const customerUsersAutocomplete = async (
  customerUuid: string,
  query: CustomersUsersListData['query'],
  prevOptions,
  currentPage: number,
) => {
  const response = await customersUsersList({
    path: { uuid: customerUuid },
    query: {
      o: 'concatenated_name',
      ...query,
      page: currentPage,
      page_size: ENV.pageSize,
    },
  });
  return returnReactSelectAsyncPaginateObject(
    parseSelectData(response),
    prevOptions,
    currentPage,
  );
};

export const getProjectUsersCount = (projectUuid) =>
  Axios.head(fixURL(`/projects/${projectUuid}/list_users/`)).then(
    parseResultCount,
  );
