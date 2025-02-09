import Axios, { AxiosRequestConfig } from 'axios';

import { ENV } from '@waldur/configs/default';
import {
  deleteById,
  get,
  getAll,
  parseResultCount,
  post,
  put,
  sendForm,
} from '@waldur/core/api';
import { IssueTemplate } from '@waldur/issues/api';

import { OIDCConfig } from './types';

export const getCustomersCount = () =>
  Axios.head(`${ENV.apiEndpoint}api/customers/`).then((response) =>
    parseResultCount(response),
  );

export const getProjectsCount = (configs?: AxiosRequestConfig<any>) =>
  Axios.head(`${ENV.apiEndpoint}api/projects/`, configs).then((response) =>
    parseResultCount(response),
  );

export const getUsersCount = () =>
  Axios.head(`${ENV.apiEndpoint}api/users/`).then((response) =>
    parseResultCount(response),
  );

export const getCategoriesCount = () =>
  Axios.head(`${ENV.apiEndpoint}api/marketplace-categories/`).then((response) =>
    parseResultCount(response),
  );

export const getProviderOfferingsCount = (configs?: AxiosRequestConfig<any>) =>
  Axios.head(
    `${ENV.apiEndpoint}api/marketplace-provider-offerings/`,
    configs,
  ).then((response) => parseResultCount(response));

export const getResourcesCount = (configs?: AxiosRequestConfig<any>) =>
  Axios.head(`${ENV.apiEndpoint}api/marketplace-resources/`, configs).then(
    (response) => parseResultCount(response),
  );

export const getVersion = () =>
  get<{ version: string | number }>('/version/').then(
    (response) => response.data,
  );

export const getIdentityProviders = () =>
  getAll<OIDCConfig>('/identity-providers/');

export const createIdentityProvider = (formData) =>
  post('/identity-providers/', formData);

export const updateIdentityProvider = (provider, formData) =>
  put(`/identity-providers/${provider}/`, formData);

export const deleteToken = (tokenURL: string) => Axios.delete(tokenURL);

export const getAdminAnnouncements = (configs?: AxiosRequestConfig<any>) =>
  getAll<any>('/admin-announcements/', configs);

export const createAdminAnnouncement = (formData) =>
  post('/admin-announcements/', formData);

export const updateAdminAnnouncement = (formData, uuid) =>
  put(`/admin-announcements/${uuid}/`, formData);

export const deleteAdminAnnouncement = (uuid) =>
  deleteById('/admin-announcements/', uuid);

export const getIssueTemplate = (uuid: string) =>
  get<IssueTemplate>(`/support-templates/${uuid}/`);

export const createIssueTemplate = (formData) =>
  post<IssueTemplate>('/support-templates/', formData);

export const updateIssueTemplate = (formData, uuid) =>
  put<IssueTemplate>(`/support-templates/${uuid}/`, formData);

export const deleteIssueTemplate = (uuid) =>
  deleteById('/support-templates/', uuid);

export const attachDocumentsToIssueTemplate = (
  issue_template_uuid: string,
  file,
  name,
  onUploadProgress: (progress: number) => void,
) =>
  sendForm(
    'POST',
    `${ENV.apiEndpoint}api/support-templates/${issue_template_uuid}/create_attachments/`,
    { attachments: file, name },
    onUploadProgress,
  );

export const removeAttachmentFromIssueTemplate = (
  issue_template_uuid: string,
  attachment_ids: string[],
) =>
  post(`/support-templates/${issue_template_uuid}/delete_attachments/`, {
    attachment_ids,
  });
