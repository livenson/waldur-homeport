import Axios, { AxiosRequestConfig } from 'axios';

import { identityProvidersList } from '@waldur/api';
import { ENV } from '@waldur/configs/default';
import { getAllPages, parseResultCount, sendForm } from '@waldur/core/api';

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

export const getIdentityProviders = () =>
  getAllPages((page) => identityProvidersList({ query: { page } }));

export const deleteToken = (tokenURL: string) => Axios.delete(tokenURL);

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
