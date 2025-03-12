import Axios, { AxiosResponse } from 'axios';

import { getRoles } from '@waldur/administration/roles/api';
import { afterBootstrap } from '@waldur/afterBootstrap';
import { initAuthToken } from '@waldur/auth/interceptor';
import { ENV } from '@waldur/configs/default';

import { format } from './ErrorMessageFormatter';

const getApiUrl = () =>
  document.querySelector('meta[name="api-url"]').getAttribute('content');

const parseLanguages = (inputValue) => {
  const languageLabels = inputValue.reduce(
    (result, [code, label]) => ({
      ...result,
      [code]: label,
    }),
    {},
  );
  return inputValue
    .map((language) => language[0])
    .map((code) => ({
      code,
      label: languageLabels[code],
    }));
};

class BadResponseFormatError extends Error {
  constructor(public response: AxiosResponse) {
    super('Malformed response');
  }
}

const fetchJSON = async (url) => {
  const response = await Axios.get(url);
  const contentType = (
    response.headers['content-type'] ||
    (response.headers as any).get('content-type') ||
    ''
  )
    .toLowerCase()
    .split(';')[0]
    .trim();

  if (contentType !== 'application/json') {
    throw new BadResponseFormatError(response);
  }
  if (typeof response.data !== 'object' || response.data === null) {
    throw new BadResponseFormatError(response);
  }
  return response.data;
};

export async function loadConfig() {
  let backendSettings;
  const restApi = getApiUrl();
  if (restApi != '__API_URL__') {
    ENV.apiEndpoint = restApi;
  }

  try {
    backendSettings = await fetchJSON(`${ENV.apiEndpoint}api/configuration/`);
  } catch (error) {
    if (!error) {
      throw new Error(
        `Unfortunately, connection to server has failed. Please check if you can connect to ${ENV.apiEndpoint} from your browser and contact support if the error continues.`,
      );
    } else if (error.response?.status >= 400) {
      throw new Error(
        `Unable to fetch server configuration. Error message: ${error.statusText}`,
      );
    } else {
      throw new Error(error);
    }
  }

  const config = {
    plugins: backendSettings,
    languageChoices: parseLanguages(backendSettings.LANGUAGES),
    defaultLanguage: backendSettings.LANGUAGE_CODE,
    FEATURES: backendSettings.FEATURES,
  };
  Object.assign(ENV, config);
  initAuthToken();
  try {
    ENV.roles = await getRoles({
      auth: null,
    });
  } catch (error) {
    throw new Error(`Unable to fetch user roles. ${format(error)}`);
  }
  afterBootstrap();
  return true;
}
