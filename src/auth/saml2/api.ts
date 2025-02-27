import Axios from 'axios';

import { apiAuthSaml2ProvidersList } from '@waldur/api';
import { ENV } from '@waldur/configs/default';
import { parseSelectData } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';

export const getSaml2IdentityProviders = async (
  name: string,
  prevOptions,
  currentPage: number,
) => {
  const response = await apiAuthSaml2ProvidersList({
    query: {
      name,
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

export const loginSaml2 = (provider: string) =>
  Axios.post(`${ENV.apiEndpoint}api-auth/saml2/login/`, { idp: provider });
