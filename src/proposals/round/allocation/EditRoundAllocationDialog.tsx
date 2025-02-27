import { FC, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { ProtectedRound, ProtectedRoundRequest } from '@waldur/api';
import { WizardFormContainer } from '@waldur/form/WizardFormContainer';
import { translate } from '@waldur/i18n';
import { closeModalDialog } from '@waldur/modal/actions';
import { updateCallRound } from '@waldur/proposals/api';
import { Call } from '@waldur/proposals/types';
import { WizardFormThirdPage } from '@waldur/proposals/update/rounds/WizardFormThirdPage';
import { getRoundInitialValues } from '@waldur/proposals/utils';

interface EditRoundAllocationDialogProps {
  resolve: {
    round: ProtectedRound;
    call: Call;
    refetch(): void;
  };
}

export const EditRoundAllocationDialog: FC<EditRoundAllocationDialogProps> = (
  props,
) => {
  const initialValues = useMemo(
    () => getRoundInitialValues(props.resolve.round),
    [props.resolve],
  );
  const dispatch = useDispatch();
  const submit = useCallback(
    (formData: ProtectedRoundRequest, _dispatch, formProps) => {
      const updatedRound = {
        ...initialValues,
        ...formData,
      };
      return updateCallRound(
        props.resolve.call.uuid,
        props.resolve.round.uuid,
        updatedRound,
      ).then(() => {
        formProps.destroy();
        dispatch(closeModalDialog());
        props.resolve.refetch();
      });
    },
    [dispatch, props.resolve, initialValues],
  );

  return (
    <WizardFormContainer
      form="RoundEditForm"
      title={translate('Edit round allocation')}
      onSubmit={submit}
      submitLabel={translate('Edit')}
      steps={[translate('Allocation')]}
      wizardForms={[WizardFormThirdPage]}
      initialValues={{
        deciding_entity: initialValues.deciding_entity,
        minimal_average_scoring: initialValues.minimal_average_scoring,
        allocation_time: initialValues.allocation_time,
        allocation_date: initialValues.allocation_date,
      }}
    />
  );
};
