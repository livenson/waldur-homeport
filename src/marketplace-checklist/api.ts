import Axios from 'axios';

import { ENV } from '@waldur/configs/default';
import { getAll, parseResultCount, post } from '@waldur/core/api';

import { Category, Checklist, Question, Answer, ChecklistStats } from './types';

export const getCategories = () =>
  getAll<Category>('/marketplace-checklists-categories/');

export const getChecklists = (categoryId?: string) =>
  getAll<Checklist>(
    categoryId
      ? `/marketplace-checklists-categories/${categoryId}/checklists/`
      : '/marketplace-checklists/',
  );

export const getQuestions = (checklistId: string) =>
  getAll<Question>(`/marketplace-checklists/${checklistId}/questions/`);

export const getAnswers = (userId: string, checklistId: string) =>
  getAll<Answer>(
    `/marketplace-checklists/${checklistId}/user/${userId}/answers/`,
  );

export const getStats = (checklistId: string) =>
  getAll<ChecklistStats>(`/marketplace-checklists/${checklistId}/stats/`);

export const getCustomerStats = (customerId: string, checklistId: string) =>
  getAll<ChecklistStats>(
    `/customers/${customerId}/marketplace-checklists/${checklistId}/`,
  );

export const updateCustomerChecklists = (
  customerId: string,
  checkliststs: string[],
) => post(`/customers/${customerId}/marketplace-checklists/`, checkliststs);

export const countChecklists = () =>
  Axios.request({
    method: 'HEAD',
    url: ENV.apiEndpoint + 'api/marketplace-checklists/',
  }).then(parseResultCount);
