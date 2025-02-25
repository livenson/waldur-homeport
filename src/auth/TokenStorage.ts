import { getItem, removeItem, setItem } from './AuthStorage';

const key = 'waldur/auth/token';

/**
 * Removes the authentication token from storage
 */
export const removeToken = (): void => removeItem(key);

/**
 * Retrieves the authentication token from storage
 * @returns The authentication token or null if not found
 */
export const getToken = (): string | null => getItem(key);

/**
 * Stores the authentication token in storage
 * @param value - The token to store
 */
export const setToken = (value: string): void => setItem(key, value);
