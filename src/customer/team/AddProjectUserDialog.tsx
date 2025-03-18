import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';
import { CustomerUser, Project, projectsAddUser } from 'waldur-js-client';

import { SubmitButton } from '@waldur/auth/SubmitButton';
import { FormContainer } from '@waldur/form';
import { translate } from '@waldur/i18n';
import { closeModalDialog } from '@waldur/modal/actions';
import { CloseDialogButton } from '@waldur/modal/CloseDialogButton';
import { Role } from '@waldur/permissions/types';
import { ExpirationTimeGroup } from '@waldur/project/team/ExpirationTimeGroup';
import { RoleGroup } from '@waldur/project/team/RoleGroup';
import { showErrorResponse } from '@waldur/store/notify';

import { OrganizationProjectSelectField } from './OrganizationProjectSelectField';
import { UserGroup } from './UserGroup';

const FORM_ID = 'AddProjectUserDialog';

interface AddProjectUserDialogFormData {
  role: Role;
  expiration_time: string;
  project: Project;
}

interface AddProjectUserDialogResolve {
  customer: CustomerUser;
  refetch;
}

interface AddProjectUserDialogOwnProps {
  resolve: AddProjectUserDialogResolve;
}

export const AddProjectUserDialog = reduxForm<
  AddProjectUserDialogFormData,
  AddProjectUserDialogOwnProps
>({
  form: FORM_ID,
})(({ submitting, handleSubmit, resolve }) => {
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={handleSubmit(async (formData) => {
        try {
          await projectsAddUser({
            path: { uuid: formData.project.uuid },
            body: {
              user: resolve.customer.uuid,
              role: formData.role.name,
              expiration_time: formData.expiration_time,
            },
          });
          await resolve.refetch();
          dispatch(closeModalDialog());
        } catch (error) {
          dispatch(
            showErrorResponse(error, translate('Unable to update permission.')),
          );
        }
      })}
    >
      <Modal.Header>
        <Modal.Title>{translate('Add project role')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormContainer submitting={submitting}>
          <UserGroup permission={resolve.customer} />
          <OrganizationProjectSelectField />
          <RoleGroup types={['project']} />
          <ExpirationTimeGroup disabled={submitting} />
        </FormContainer>
      </Modal.Body>
      <Modal.Footer>
        <SubmitButton submitting={submitting}>{translate('Save')}</SubmitButton>
        <CloseDialogButton />
      </Modal.Footer>
    </form>
  );
});
