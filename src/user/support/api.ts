import { post } from '@waldur/core/api';

export const addRemoteUser = (cuid) => post('/remote-eduteams/', { cuid });
