import {
  customersUsersList,
  CustomersUsersListData,
  projectsListUsersList,
} from '@waldur/api';
import { getAll, parseSelectData, post } from '@waldur/core/api';

import { GenericPermission } from './types';

export const addProjectUser = ({
  project,
  user,
  role,
  expiration_time,
}: {
  project;
  user;
  role;
  expiration_time?;
}) =>
  post(`/projects/${project}/add_user/`, {
    user,
    role,
    expiration_time,
  });

export const deleteProjectUser = ({ project, user, role }) =>
  post(`/projects/${project}/delete_user/`, {
    user,
    role,
  });

export const updateProjectUser = ({ project, user, role, expiration_time }) =>
  post(`/projects/${project}/update_user/`, {
    user,
    role,
    expiration_time,
  });

export const addCustomerUser = ({
  customer,
  user,
  role,
  expiration_time,
}: {
  customer;
  user;
  role;
  expiration_time?;
}) =>
  post(`/customers/${customer}/add_user/`, {
    user,
    role,
    expiration_time,
  });

export const deleteCustomerUser = ({ customer, user, role }) =>
  post(`/customers/${customer}/delete_user/`, {
    user,
    role,
  });

export const updateCustomerUser = ({ customer, user, role, expiration_time }) =>
  post(`/customers/${customer}/update_user/`, {
    user,
    role,
    expiration_time,
  });

export const addOfferingPermission = ({
  offering,
  user,
  role,
  expiration_time,
}) =>
  post(`/marketplace-provider-offerings/${offering}/add_user/`, {
    user,
    role,
    expiration_time,
  });

export const deleteOfferingPermission = ({ offering, user, role }) =>
  post(`/marketplace-provider-offerings/${offering}/delete_user/`, {
    user,
    role,
  });

export const updateOfferingPermission = ({
  offering,
  user,
  role,
  expiration_time,
}) =>
  post(`/marketplace-provider-offerings/${offering}/update_user/`, {
    user,
    role,
    expiration_time,
  });

export const getCustomerUsers = (
  customerUuid: string,
  params: CustomersUsersListData['query'] = {},
) =>
  customersUsersList({
    path: { uuid: customerUuid },
    query: {
      field: ['uuid', 'full_name', 'email', 'role_name'],
      ...params,
    },
  }).then(parseSelectData);

export const fetchSelectProjectUsers = (projectUuid: string, params = {}) =>
  projectsListUsersList({
    path: { uuid: projectUuid },
    query: {
      field: ['user_uuid', 'user_full_name', 'user_email', 'role_name'],
      ...params,
    },
  }).then(parseSelectData);

export const fetchAllProjectUsers = (projectId: string) =>
  getAll<GenericPermission>(`/projects/${projectId}/list_users/`, {
    params: {
      field: ['user_uuid', 'user_full_name', 'user_email', 'role_name'],
    },
  });

export const addCallOrganizationUser = ({
  uuid,
  user,
  role,
  expiration_time,
}: {
  uuid;
  user;
  role;
  expiration_time?;
}) =>
  post(`/call-managing-organisations/${uuid}/add_user/`, {
    user,
    role,
    expiration_time,
  });

export const addServiceProviderUser = ({
  uuid,
  user,
  role,
  expiration_time,
}: {
  uuid;
  user;
  role;
  expiration_time?;
}) =>
  post(`/marketplace-service-providers/${uuid}/add_user/`, {
    user,
    role,
    expiration_time,
  });
