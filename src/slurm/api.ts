import { ENV } from '@waldur/configs/default';
import { sendForm } from '@waldur/core/api';

export const submitJob = (payload) =>
  sendForm('POST', `${ENV.apiEndpoint}api/slurm-jobs/`, payload);
