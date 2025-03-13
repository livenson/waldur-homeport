import Axios from 'axios';
import { usersList, UsersListData } from 'waldur-js-client';

import { ENV } from '@waldur/configs/default';
import { fixURL, parseResultCount, parseSelectData } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';

export const usersAutocomplete = async (
  query: Partial<UsersListData['query']>,
  prevOptions,
  currentPage: number,
) => {
  const response = await usersList({
    query: {
      field: [
        'full_name',
        'url',
        'email',
        'uuid',
        'username',
        'registration_method',
        'is_active',
      ],
      o: ['full_name'],
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

export const getCustomerUsersCount = (customerUuid) =>
  Axios.head(fixURL(`/customers/${customerUuid}/users/`)).then(
    parseResultCount,
  );
