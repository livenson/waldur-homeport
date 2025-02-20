import { openstackServerGroupsDestroy } from '@waldur/api';
import { DestroyActionItem } from '@waldur/resource/actions/DestroyActionItem';
import { ActionItemType } from '@waldur/resource/actions/types';

export const DestroyServerGroupAction: ActionItemType = ({
  resource,
  refetch,
}) => (
  <DestroyActionItem
    apiMethod={(id) => openstackServerGroupsDestroy({ path: { uuid: id } })}
    resource={resource}
    refetch={refetch}
  />
);
