import { ENV } from '@waldur/configs/default';
import { post, sendForm } from '@waldur/core/api';
import { UserDetails } from '@waldur/workspace/types';

export const updateUser = (userUuid: string, values: Record<string, any>) => {
  const data = { ...values };
  if ('image' in data && !data.image) {
    data.image = '';
  }
  if ('token_lifetime' in data && data.token_lifetime) {
    data.token_lifetime = data.token_lifetime.value;
  }

  return sendForm<UserDetails>(
    'PATCH',
    `${ENV.apiEndpoint}api/users/${userUuid}/`,
    data,
  );
};

export const addRemoteUser = (cuid) => post('/remote-eduteams/', { cuid });
