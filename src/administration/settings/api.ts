import { get } from '@waldur/core/api';

export const getDBSettings = () => get('/override-settings/');
