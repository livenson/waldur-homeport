import { post } from '@waldur/core/api';

export const overrideNotificationTemplate = (url, content) => {
  return post(`${url}override/`, content);
};

export const enableNotification = (url) => {
  return post(`${url}enable/`);
};

export const disableNotification = (url) => {
  return post(`${url}disable/`);
};
