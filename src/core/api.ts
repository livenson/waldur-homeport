import { formDataBodySerializer, RequestResult } from '@hey-api/client-fetch';
import Axios, {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

import { ENV } from '@waldur/configs/default';

export const fixURL = (endpoint: string) =>
  endpoint.startsWith('http') ? endpoint : `${ENV.apiEndpoint}api${endpoint}`;

export const parseResultCount = (response: AxiosResponse): number => {
  const resultCount =
    response.headers['x-result-count'] ||
    (response.headers as any).get('x-result-count');
  return parseInt(resultCount, 10);
};

export const fetchResultCount = (result): number =>
  parseInt(result.response.headers.get('x-result-count'), 10);

export function get<T = {}>(
  endpoint: string,
  options?: AxiosRequestConfig,
): AxiosPromise<T> {
  return Axios.get(fixURL(endpoint), options);
}

export function parseSelectData<TData = {}>(
  result: Awaited<RequestResult<TData>>,
) {
  return {
    options: Array.isArray(result.data) ? (result.data as TData) : [],
    totalItems: fetchResultCount(result),
  };
}

export function post<T = {}>(
  endpoint: string,
  data?: any,
  options?: AxiosRequestConfig,
): AxiosPromise<T> {
  return Axios.post(fixURL(endpoint), data, options);
}

export function sendForm<T = {}>(
  method: Method,
  url: string,
  options,
  onUploadProgress?: (progress: number) => void,
): AxiosPromise<T> {
  const data = new FormData();
  for (const name of Object.keys(options)) {
    if (options[name] !== undefined) {
      const option = options[name] === null ? '' : options[name];
      data.append(name, option);
    }
  }
  return Axios.request({
    method,
    url,
    data,
    transformRequest: (x) => x,
    headers: onUploadProgress
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': undefined },
    onUploadProgress: (progressEvent) => {
      if (!onUploadProgress) return;
      const progress = Math.round(
        (progressEvent.loaded * 100) / (progressEvent.total || 1),
      );
      onUploadProgress(progress);
    },
  });
}

export const getNextPageUrl = (response) => {
  // Extract next page URL from header links
  const link = response.headers['link'] || response.headers.get('link');
  if (!link) {
    return null;
  }

  const nextLink = link
    .split(', ')
    .filter((s) => s.indexOf('rel="next"') > -1)[0];
  if (!nextLink) {
    return null;
  }

  return nextLink.split(';')[0].slice(1, -1);
};

export async function getAllPages<T>(
  fetchPage: (page: number) => Promise<{ data: T[]; response }>,
): Promise<T[]> {
  let results: T[] = [];
  let nextUrl: string | undefined;
  let page = 1;

  do {
    const result = await fetchPage(page);
    results = results.concat(result.data);

    page += 1;
    if (result.response) {
      nextUrl = getNextPageUrl(result.response);
    }
  } while (nextUrl);

  return results;
}

export const formDataOptions = {
  ...formDataBodySerializer,
  headers: {
    'Content-Type': null,
  },
};

export const fileSerializer = (image) => {
  if (image === null) {
    return '' as null;
  } else if (image instanceof File) {
    return image;
  } else {
    return undefined;
  }
};
