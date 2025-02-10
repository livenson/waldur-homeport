import { X, ListChecks } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { formatJsxTemplate, translate } from '@waldur/i18n';
import { waitForConfirmation } from '@waldur/modal/actions';
import {
  acceptProposalReview,
  rejectProposalReview,
} from '@waldur/proposals/api';
import { ProposalReview } from '@waldur/proposals/types';
import { ActionItem } from '@waldur/resource/actions/ActionItem';
import { showErrorResponse, showSuccess } from '@waldur/store/notify';

interface ReviewItemActionProps {
  row: ProposalReview;
  refetch;
}

export const ReviewItemAction = ({ row, refetch }: ReviewItemActionProps) => {
  const dispatch = useDispatch();
  const { mutate: accept, isLoading: isAcceptLoading } = useMutation(
    async () => {
      try {
        await waitForConfirmation(
          dispatch,
          translate('Start review'),
          translate(
            'Are you sure you want to start reviewing proposal {name}?',
            {
              name: <b>{row.proposal_name}</b>,
            },
            formatJsxTemplate,
          ),
        );
      } catch {
        return;
      }
      try {
        await acceptProposalReview(row.uuid);
        refetch();
        dispatch(showSuccess(translate('Review has been accepted.')));
      } catch (response) {
        dispatch(
          showErrorResponse(response, translate('Unable to accept review.')),
        );
      }
    },
  );
  const { mutate: reject, isLoading: isRejectLoading } = useMutation(
    async () => {
      try {
        await waitForConfirmation(
          dispatch,
          translate('Reject review'),
          translate(
            'Are you sure you want to reject the {name} proposal review?',
            {
              name: <b>{row.proposal_name}</b>,
            },
            formatJsxTemplate,
          ),
        );
      } catch {
        return;
      }
      try {
        await rejectProposalReview(row.uuid);
        refetch();
        dispatch(showSuccess(translate('Review has been rejected.')));
      } catch (response) {
        dispatch(
          showErrorResponse(response, translate('Unable to reject review.')),
        );
      }
    },
  );
  return row.state === 'created' ? (
    <>
      <ActionItem
        action={accept}
        title={translate('Start review')}
        iconNode={<ListChecks />}
        disabled={isAcceptLoading || isRejectLoading}
      />
      <ActionItem
        action={reject}
        title={translate('Send back')}
        iconNode={<X />}
        disabled={isAcceptLoading || isRejectLoading}
      />
    </>
  ) : null;
};
