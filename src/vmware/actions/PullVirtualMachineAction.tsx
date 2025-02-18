import { vmwareVirtualMachinePull } from '@waldur/api';
import { PullActionItem } from '@waldur/resource/actions/PullActionItem';
import { ActionItemType } from '@waldur/resource/actions/types';

export const PullVirtualMachineAction: ActionItemType = ({
  resource,
  refetch,
}) => (
  <PullActionItem
    apiMethod={(id) => vmwareVirtualMachinePull({ path: { uuid: id } })}
    resource={resource}
    refetch={refetch}
  />
);
