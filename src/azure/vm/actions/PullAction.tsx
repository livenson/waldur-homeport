import { azureVirtualmachinesPull } from '@waldur/api';
import { PullActionItem } from '@waldur/resource/actions/PullActionItem';
import { ActionItemType } from '@waldur/resource/actions/types';

export const PullAction: ActionItemType = ({ resource, refetch }) => (
  <PullActionItem
    apiMethod={(id) => azureVirtualmachinesPull({ path: { uuid: id } })}
    resource={resource}
    refetch={refetch}
  />
);
