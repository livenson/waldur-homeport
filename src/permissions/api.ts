import {
  projectsAddUser,
  projectsDeleteUser,
  projectsUpdateUser,
  customersAddUser,
  customersDeleteUser,
  customersUpdateUser,
  marketplaceProviderOfferingsAddUser,
  marketplaceProviderOfferingsDeleteUser,
  marketplaceProviderOfferingsUpdateUser,
  callManagingOrganisationsAddUser,
  marketplaceServiceProvidersAddUser,
  ProjectsListUsersListData,
} from '@waldur/api';
import {
  customersUsersList,
  CustomersUsersListData,
  projectsListUsersList,
} from '@waldur/api';
import { getAllPages, parseSelectData } from '@waldur/core/api';

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
  projectsAddUser({
    path: { uuid: project },
    body: {
      user,
      role,
      expiration_time,
    },
  });

export const deleteProjectUser = ({ project, user, role }) =>
  projectsDeleteUser({
    path: { uuid: project },
    body: {
      user,
      role,
    },
  });

export const updateProjectUser = ({ project, user, role, expiration_time }) =>
  projectsUpdateUser({
    path: { uuid: project },
    body: {
      user,
      role,
      expiration_time,
    },
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
  customersAddUser({
    path: { uuid: customer },
    body: {
      user,
      role,
      expiration_time,
    },
  });

export const deleteCustomerUser = ({ customer, user, role }) =>
  customersDeleteUser({
    path: { uuid: customer },
    body: {
      user,
      role,
    },
  });

export const updateCustomerUser = ({ customer, user, role, expiration_time }) =>
  customersUpdateUser({
    path: { uuid: customer },
    body: {
      user,
      role,
      expiration_time,
    },
  });

export const addOfferingPermission = ({
  offering,
  user,
  role,
  expiration_time,
}) =>
  marketplaceProviderOfferingsAddUser({
    path: { uuid: offering },
    body: {
      user,
      role,
      expiration_time,
    },
  });

export const deleteOfferingPermission = ({ offering, user, role }) =>
  marketplaceProviderOfferingsDeleteUser({
    path: { uuid: offering },
    body: {
      user,
      role,
    },
  });

export const updateOfferingPermission = ({
  offering,
  user,
  role,
  expiration_time,
}) =>
  marketplaceProviderOfferingsUpdateUser({
    path: { uuid: offering },
    body: {
      user,
      role,
      expiration_time,
    },
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

export const fetchSelectProjectUsers = (
  projectUuid: string,
  params: ProjectsListUsersListData['query'] = {},
) =>
  projectsListUsersList({
    path: { uuid: projectUuid },
    query: {
      field: ['user_uuid', 'user_full_name', 'user_email', 'role_name'],
      ...params,
    },
  }).then(parseSelectData);

export const fetchAllProjectUsers = (projectId: string) =>
  getAllPages((page) =>
    projectsListUsersList({
      path: { uuid: projectId },
      query: {
        page,
        field: ['user_uuid', 'user_full_name', 'user_email', 'role_name'],
      },
    }),
  );

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
  callManagingOrganisationsAddUser({
    path: { uuid },
    body: {
      user,
      role,
      expiration_time,
    },
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
  marketplaceServiceProvidersAddUser({
    path: { uuid },
    body: {
      user,
      role,
      expiration_time,
    },
  });
