import { openstackInstancesPull } from '@waldur/api';
import { PullActionItem } from '@waldur/resource/actions/PullActionItem';
import { ActionItemType } from '@waldur/resource/actions/types';

export const PullInstanceAction: ActionItemType = ({ resource, refetch }) => (
  <PullActionItem
    apiMethod={(uuid: string) => openstackInstancesPull({ path: { uuid } })}
    resource={resource}
    refetch={refetch}
  />
);
