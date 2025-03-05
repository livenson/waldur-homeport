import { getAll } from '@waldur/core/api';
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
