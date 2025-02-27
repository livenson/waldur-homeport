import Axios from 'axios';

import { usersList, UsersListData } from '@waldur/api';
import { ENV } from '@waldur/configs/default';
import {
  fixURL,
  parseResultCount,
  parseSelectData,
  post,
} from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';

export const closeReview = (reviewId: string) =>
  post(`/customer-permissions-reviews/${reviewId}/close/`);

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
