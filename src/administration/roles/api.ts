import { rolesList } from '@waldur/api';
import { getAllPages } from '@waldur/core/api';

export const getRoles = () =>
  getAllPages((page) => rolesList({ query: { page } }));
