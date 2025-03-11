import Axios from 'axios';

import { get } from '@waldur/core/api';

export const getYAML = (url: string) =>
  get<{ yaml: string }>(`${url}yaml/`).then((response) => response.data);

export const putYAML = (url: string, yaml: string) =>
  Axios.put(`${url}yaml/`, { yaml });
