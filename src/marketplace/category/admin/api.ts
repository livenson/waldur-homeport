import { ENV } from '@waldur/configs/default';
import { getAll, sendForm } from '@waldur/core/api';

import { Category, CategoryGroup } from '../../types';

export const createCategory = (data) => {
  const formData = {
    title: data.title,
    description: data.description,
    icon: data.icon,
    group: data.group,
    default_vm_category: data.default_vm_category,
    default_volume_category: data.default_volume_category,
    default_tenant_category: data.default_tenant_category,
  };
  return sendForm<Category>(
    'POST',
    `${ENV.apiEndpoint}api/marketplace-categories/`,
    formData,
  );
};

export const updateCategory = (data, uuid) => {
  const formData = {
    title: data.title,
    description: data.description,
    icon: data.icon,
    group: data.group?.url || null,
    default_vm_category: data.default_vm_category,
    default_volume_category: data.default_volume_category,
    default_tenant_category: data.default_tenant_category,
  };
  if (!formData.icon) {
    formData.icon = '';
  } else if (!(formData.icon instanceof File)) {
    formData.icon = undefined;
  }
  return sendForm<Category>(
    'PATCH',
    `${ENV.apiEndpoint}api/marketplace-categories/${uuid}/`,
    formData,
  );
};

export const createCategoryGroup = (data) => {
  const formData = {
    title: data.title,
    description: data.description,
    icon: data.icon,
  };
  return sendForm<CategoryGroup>(
    'POST',
    `${ENV.apiEndpoint}api/marketplace-category-groups/`,
    formData,
  );
};

export const updateCategoryGroup = (data, uuid) => {
  const formData = {
    title: data.title,
    description: data.description,
    icon: data.icon,
  };
  if (!formData.icon) {
    formData.icon = '';
  } else if (!(formData.icon instanceof File)) {
    formData.icon = undefined;
  }
  return sendForm<CategoryGroup>(
    'PATCH',
    `${ENV.apiEndpoint}api/marketplace-category-groups/${uuid}/`,
    formData,
  );
};

export const getCategoryColumns = (params) =>
  getAll<any>(`/marketplace-category-columns/`, { params });
