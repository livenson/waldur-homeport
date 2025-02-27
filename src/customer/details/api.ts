import { ENV } from '@waldur/configs/default';
import { sendForm } from '@waldur/core/api';
import { Customer } from '@waldur/workspace/types';

export const updateCustomer = (
  customerUuid: string,
  values: Record<string, any>,
) => {
  const data = { ...values };
  if ('image' in data && !data.image) {
    data.image = '';
  }
  if ('country' in data && data.country) {
    data.country = data.country.value;
  }

  return sendForm<Customer>(
    'PATCH',
    `${ENV.apiEndpoint}api/customers/${customerUuid}/`,
    data,
  );
};
