import { useRouter } from '@uirouter/react';
import { useCallback } from 'react';
import { reduxForm } from 'redux-form';

import { proposalProposalsCreate } from '@waldur/api';
import { required } from '@waldur/core/validators';
import { SubmitButton } from '@waldur/form';
import { FormContainer } from '@waldur/form/FormContainer';
import { StringField } from '@waldur/form/StringField';
import { translate } from '@waldur/i18n';
import { ModalDialog } from '@waldur/modal/ModalDialog';
import { Call, Round } from '@waldur/proposals/types';
import { useNotify } from '@waldur/store/hooks';
import { UsersService } from '@waldur/user/UsersService';

interface FormData {
  name: string;
}

export const AddProposalDialog = reduxForm<
  FormData,
  { resolve: { round: Round; call: Call } }
>({
  form: 'AddProposalForm',
})((props) => {
  const router = useRouter();
  const { showSuccess, showErrorResponse } = useNotify();
  const processRequest = useCallback(
    (values: FormData) => {
      async () => {
        try {
          const response = await proposalProposalsCreate({
            body: {
              ...values,
              round_uuid: props.resolve.round.uuid,
            },
          });
          const proposal = response.data;
          showSuccess(translate('Proposal created successfully'));
          UsersService.getCurrentUser(true);
          router.stateService.go('proposals.manage-proposal', {
            proposal_uuid: proposal.uuid,
          });
        } catch (error) {
          showErrorResponse(error, translate('Something went wrong'));
        }
      };
    },
    [props.resolve, router],
  );

  return (
    <form onSubmit={props.handleSubmit(processRequest)}>
      <ModalDialog
        title={translate('Create proposal')}
        closeButton
        footer={
          <SubmitButton
            disabled={props.invalid}
            submitting={props.submitting}
            label={translate('Create')}
          />
        }
      >
        <FormContainer submitting={props.submitting}>
          <StringField
            label={translate('Name')}
            name="name"
            required
            validate={required}
          />
        </FormContainer>
      </ModalDialog>
    </form>
  );
});
