import { FunctionComponent } from 'react';

import { OrganizationGroupCreateButton } from '@waldur/administration/organizations/OrganizationGroupCreateButton';
import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { translate } from '@waldur/i18n';
import { useOrganizationGroups } from '@waldur/marketplace/common/utils';
import { SetAccessPolicyDialogForm } from '@waldur/marketplace/offerings/actions/SetAccessPolicyDialogForm';
import { Plan } from '@waldur/marketplace/types';
import { NoResult } from '@waldur/navigation/header/search/NoResult';

interface SetAccessPolicyDialogProps {
  resolve: {
    plan?: Plan;
    refetch: any;
  };
}

export const SetAccessPolicyDialog: FunctionComponent<
  SetAccessPolicyDialogProps
> = ({ resolve }) => {
  const {
    data: organizationGroups,
    isLoading,
    isError,
    refetch: refetchGroups,
  } = useOrganizationGroups();

  return isLoading ? (
    <LoadingSpinner />
  ) : isError ? (
    <>{translate('Unable to load organization groups.')}</>
  ) : organizationGroups.length > 0 ? (
    <SetAccessPolicyDialogForm
      organizationGroups={organizationGroups}
      plan={resolve.plan}
      refetch={resolve.refetch}
    />
  ) : (
    <NoResult
      title={translate('No organization groups found')}
      message={translate(
        'No organization groups are currently defined. Please create groups to configure access policies.',
      )}
      actions={<OrganizationGroupCreateButton refetch={refetchGroups} />}
    />
  );
};
