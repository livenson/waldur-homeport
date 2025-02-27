import { organizationGroupsList } from '@waldur/api';
import { ENV } from '@waldur/configs/default';
import { parseSelectData, sendForm } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';

export const updateOrganization = (formData) => {
  const data = { ...formData };
  if (!data.image) {
    data.image = '';
  } else if (!(data.image instanceof File)) {
    data.image = undefined;
  }

  return sendForm(
    'PATCH',
    `${ENV.apiEndpoint}api/customers/${data.uuid}/`,
    data,
  );
};

export const organizationGroupAutocomplete = async (
  query: string,
  prevOptions,
  { page },
) => {
  const response = await organizationGroupsList({
    query: {
      name: query,
      page: page,
      page_size: ENV.pageSize,
      o: 'name',
    },
  });
  return returnReactSelectAsyncPaginateObject(
    parseSelectData(response),
    prevOptions,
    page,
  );
};
