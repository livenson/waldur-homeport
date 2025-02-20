import { BookedItem } from '@waldur/booking/types';
import { getAll } from '@waldur/core/api';

export const getOfferingBookedItems = (offeringUuid: string) =>
  getAll<BookedItem[]>(`/marketplace-bookings/${offeringUuid}/`);
