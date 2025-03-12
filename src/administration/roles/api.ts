import { Options, rolesList, RolesListData } from '@waldur/api';
import { getAllPages } from '@waldur/core/api';

export const getRoles = (options?: Options<RolesListData>) =>
  getAllPages((page) => rolesList({ query: { page }, ...options }));
