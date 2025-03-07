import { openstackVolumesPull } from '@waldur/api';
import { PullActionItem } from '@waldur/resource/actions/PullActionItem';
import { ActionItemType } from '@waldur/resource/actions/types';

export const PullAction: ActionItemType = ({ resource, refetch }) => (
  <PullActionItem
    resource={resource}
    apiMethod={(uuid: string) => openstackVolumesPull({ path: { uuid } })}
    refetch={refetch}
  />
);
