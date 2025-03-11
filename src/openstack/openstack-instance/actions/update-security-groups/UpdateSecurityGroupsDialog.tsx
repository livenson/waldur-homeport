import { FC } from 'react';

import { OpenStackInstance } from '@waldur/api';

import { UpdateSecurityGroupsForm } from './UpdateSecurityGroupsForm';
import { useUpdateSecurityGroupsForm } from './utils';

interface UpdateSecurityGroupsDialogProps {
  resolve: {
    resource: OpenStackInstance;
    refetch?(): void;
  };
}

export const UpdateSecurityGroupsDialog: FC<
  UpdateSecurityGroupsDialogProps
> = ({ resolve: { resource, refetch } }) => {
  const formState = useUpdateSecurityGroupsForm(resource, refetch);
  return <UpdateSecurityGroupsForm {...formState} />;
};
