import { IdentityProvider } from 'waldur-js-client';

import { ENV } from '@waldur/configs/default';

export const getOauthURL = (provider: Pick<IdentityProvider, 'provider'>) =>
  `${ENV.apiEndpoint}api-auth/${provider.provider}/init/`;
