import { paymentsList } from 'waldur-js-client';

import { getAllPages } from '@waldur/core/api';

export const getTotalOfSumPaid = (profileUuid: string): Promise<number> =>
  getAllPages((page) =>
    paymentsList({ query: { page, profile_uuid: profileUuid } }),
  ).then((response) =>
    response.length
      ? response.map((payment) => parseInt(payment.sum)).reduce((a, b) => a + b)
      : 0,
  );
