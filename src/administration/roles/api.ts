import { getAll } from '@waldur/core/api';
import { Role } from '@waldur/permissions/types';

export const getRoles = () => getAll<Role>('/roles/');
