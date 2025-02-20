import Axios from 'axios';

import { post } from '@waldur/core/api';

import { HookResponse } from './types';

const HOOK_ENDPOINTS = {
  email: '/hooks-email/',
  webhook: '/hooks-web/',
};

export const removeHook = (url: string) => Axios.delete(url);

export const createHook = (hookType, payload) =>
  post<HookResponse>(HOOK_ENDPOINTS[hookType], payload);
