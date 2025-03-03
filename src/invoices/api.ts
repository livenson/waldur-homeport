import { getAll } from '@waldur/core/api';

export const loadInvoices = (options) =>
  getAll<{ url: string; number: string; year: number; month: number }>(
    '/invoices/',
    options,
  );
