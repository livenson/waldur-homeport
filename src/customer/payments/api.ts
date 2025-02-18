import { ENV } from '@waldur/configs/default';
import { getAll, sendForm } from '@waldur/core/api';
import { Payment } from '@waldur/workspace/types';

export const getTotalOfSumPaid = (profileUuid: string) => {
  const params = {
    profile_uuid: profileUuid,
  };
  return getAll<Payment>('/payments/', { params }).then((response: any) =>
    response.length
      ? response.reduce((a, b) => parseInt(a.sum) + parseInt(b.sum))
      : '0',
  );
};

export const createPayment = (data) =>
  sendForm('POST', `${ENV.apiEndpoint}api/payments/`, data);

export const updatePayment = (uuid, data) =>
  sendForm('PATCH', `${ENV.apiEndpoint}api/payments/${uuid}/`, data);
