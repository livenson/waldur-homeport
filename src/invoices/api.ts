import { ENV } from '@waldur/configs/default';
import { getAll, sendForm } from '@waldur/core/api';
import { formatDate } from '@waldur/core/dateUtils';

export const markAsPaid = (data) => {
  const reqData = {
    date: data.formData.date ? formatDate(data.formData.date) : undefined,
    proof: data.formData.proof,
  };
  return sendForm(
    'POST',
    `${ENV.apiEndpoint}api/invoices/${data.invoiceUuid}/paid/`,
    reqData,
  );
};

export const loadInvoices = (options) =>
  getAll<{ url: string; number: string; year: number; month: number }>(
    '/invoices/',
    options,
  );
