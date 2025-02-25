import Axios from 'axios';

import { ENV } from '@waldur/configs/default';
import { router } from '@waldur/router';
import store from '@waldur/store/store';
import {
  clearImpersonationData,
  UsersService,
} from '@waldur/user/UsersService';
import { setCurrentUser } from '@waldur/workspace/actions';

import { getRedirect, resetRedirect, setRedirect } from './AuthRedirectStorage';
import { getToken, removeToken, setToken } from './TokenStorage';

interface LoginResponse {
  token: string;
  method?: string;
  [key: string]: any;
}

/**
 * Sets the authentication token in the header for API requests
 * @param token - The authentication token
 */
export function setAuthHeader(token: string): void {
  setToken(token);
  Axios.defaults.headers.Authorization = 'Token ' + token;
}

/**
 * Processes successful login by storing the token and user data
 * @param response - The login response data with token and user info
 */
export function loginSuccess(response: { data: LoginResponse }): void {
  setAuthHeader(response.data.token);
  store.dispatch(setCurrentUser(response.data));
}

/**
 * Checks if the user is currently authenticated
 * @returns True if authenticated, false otherwise
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Authenticates a user with username and password
 * @param username - The username
 * @param password - The password
 * @returns Promise resolving to the authenticated user data
 */
export async function signin(
  username: string,
  password: string,
): Promise<void> {
  const response = await Axios.post<{ token: string }>(
    ENV.apiEndpoint + 'api-auth/password/',
    {
      username,
      password,
    },
  );
  const user = await UsersService.getCurrentUser();
  loginSuccess({
    data: { ...user, token: response.data.token, method: 'local' },
  });
}

/**
 * Stores the current state and params for redirect after authentication
 */
export function storeRedirect(): void {
  if (
    router.globals.params?.toState &&
    router.globals.params?.toState !== 'profile.details'
  ) {
    setRedirect({
      toState: router.globals.params.toState,
      toParams: router.globals.params.toParams,
    });
  }
}

/**
 * Redirects the user to the stored location after successful authentication
 * @returns Promise that resolves when the redirection is complete
 */
export function redirectOnSuccess(): Promise<any> {
  const redirect = getRedirect();
  if (redirect) {
    resetRedirect();
    // If redirect is not possible, go to default state
    const href = router.stateService.href(redirect.toState, redirect.toParams);
    if (!href) {
      return router.stateService.go('profile.details', { reload: true });
    }
    return router.stateService.go(redirect.toState, redirect.toParams, {
      reload: true,
      custom: {
        fallbackState: 'profile.details',
      },
    });
  } else {
    return router.stateService.go('profile.details', { reload: true });
  }
}

/**
 * Clears the authentication cache including token and user data
 */
export function clearAuthCache(): void {
  store.dispatch(setCurrentUser(undefined));
  clearImpersonationData();
  delete Axios.defaults.headers.Authorization;
  removeToken();
}

/**
 * Performs a local logout by clearing auth cache and redirecting to login
 */
export function localLogout(): void {
  clearAuthCache();
  router.stateService.go('login');
}
