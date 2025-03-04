import Axios from 'axios';

import { ENV } from '@waldur/configs/default';
import { parseResultCount } from '@waldur/core/api';

export const countProjectUpdateRequestsList = (params) =>
  Axios.request({
    method: 'HEAD',
    url: ENV.apiEndpoint + 'api/marketplace-project-update-requests/',
    params,
  }).then(parseResultCount);
