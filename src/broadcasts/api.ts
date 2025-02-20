import { getSelectData } from '@waldur/core/api';

import { MessageTemplate } from './types';

export const getTemplateList = (params?: {}) =>
  getSelectData<MessageTemplate>('/broadcast-message-templates/', params);
