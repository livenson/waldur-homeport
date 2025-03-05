import { useQuery } from '@tanstack/react-query';
import { useCurrentStateAndParams } from '@uirouter/react';

import { proposalProposalsRetrieve } from '@waldur/api';
import { LoadingErred } from '@waldur/core/LoadingErred';
import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { SidebarLayout } from '@waldur/form/SidebarLayout';
import { translate } from '@waldur/i18n';
import { PageBarProvider } from '@waldur/marketplace/context';
import { useTitle } from '@waldur/navigation/title';
import { getAllProposalReviews } from '@waldur/proposals/api';
import { Proposal } from '@waldur/proposals/types';

import { ProposalDetails } from '../ProposalDetails';

import { ProgressSteps } from './ProgressSteps';
import { ProposalHeader } from './ProposalHeader';
import { ProposalSubmissionStep } from './ProposalSubmissionStep';

export const ProposalManagePage = () => {
  useTitle(translate('Update proposal'));

  const {
    params: { proposal_uuid },
  } = useCurrentStateAndParams();

  const {
    data: proposal,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ['Proposal', proposal_uuid],
    () =>
      proposalProposalsRetrieve({
        path: { uuid: proposal_uuid },
      }).then((response) => response.data as any as Proposal),
    {
      refetchOnWindowFocus: false,
    },
  );

  const { data: reviews, isLoading: isLoadingReviews } = useQuery(
    ['ProposalReviews', proposal_uuid],
    () => getAllProposalReviews(proposal_uuid),
    { refetchOnWindowFocus: false },
  );

  if (isLoading || isLoadingReviews) {
    return <LoadingSpinner />;
  } else if (error) {
    return <LoadingErred loadData={refetch} />;
  }

  return (
    <PageBarProvider scrollOffset={100}>
      <SidebarLayout.Header className="pb-5">
        <div className="w-100">
          <ProposalHeader proposal={proposal} className="mb-7" />
          <ProgressSteps proposal={proposal} bgClass="bg-body" />
        </div>
      </SidebarLayout.Header>
      {proposal.state === 'draft' ? (
        <ProposalSubmissionStep
          proposal={proposal}
          refetch={refetch}
          reviews={reviews}
        />
      ) : (
        <ProposalDetails proposal={proposal} reviews={reviews} />
      )}
    </PageBarProvider>
  );
};
