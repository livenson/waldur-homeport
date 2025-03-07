import { openstackFloatingIpsPull } from '@waldur/api';
import { PullActionItem } from '@waldur/resource/actions/PullActionItem';
import { ActionItemType } from '@waldur/resource/actions/types';

export const PullFloatingIpAction: ActionItemType = ({ resource, refetch }) => (
  <PullActionItem
    apiMethod={(uuid: string) => openstackFloatingIpsPull({ path: { uuid } })}
    resource={resource}
    refetch={refetch}
  />
);
