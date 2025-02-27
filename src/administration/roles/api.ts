import { getAll, put } from '@waldur/core/api';
import { Role } from '@waldur/permissions/types';

export const editRole = (uuid, formData) => put(`/roles/${uuid}/`, formData);

export const updateRoleDescriptions = (uuid, formData) =>
  put(`/roles/${uuid}/update_descriptions/`, formData);

export const getRoles = () => getAll<Role>('/roles/');
