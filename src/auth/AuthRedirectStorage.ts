interface RedirectData {
  toState: string;
  toParams?: Record<string, any>;
}

const key = 'waldur/auth/redirect';

export const setRedirect = (value: RedirectData): void =>
  localStorage.setItem(key, JSON.stringify(value));

export const resetRedirect = (): void => localStorage.removeItem(key);

export const getRedirect = (): RedirectData | undefined => {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value) as RedirectData;
    } catch {
      return undefined;
    }
  }
  return undefined;
};
