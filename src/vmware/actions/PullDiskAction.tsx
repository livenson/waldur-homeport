import { vmwareDisksPull } from '@waldur/api';
import { PullActionItem } from '@waldur/resource/actions/PullActionItem';
import { ActionItemType } from '@waldur/resource/actions/types';

export const PullDiskAction: ActionItemType = ({ resource, refetch }) => (
  <PullActionItem
    apiMethod={(id) => vmwareDisksPull({ path: { uuid: id } })}
    resource={resource}
    refetch={refetch}
  />
);
