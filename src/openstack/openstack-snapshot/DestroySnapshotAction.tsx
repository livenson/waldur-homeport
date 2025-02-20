import { openstackSnapshotsDestroy } from '@waldur/api';
import { validateState } from '@waldur/resource/actions/base';
import { DestroyActionItem } from '@waldur/resource/actions/DestroyActionItem';
import { ActionItemType } from '@waldur/resource/actions/types';

const validators = [validateState('OK', 'Erred')];

export const DestroySnapshotAction: ActionItemType = ({
  resource,
  refetch,
}) => (
  <DestroyActionItem
    validators={validators}
    resource={resource}
    refetch={refetch}
    apiMethod={(id) => openstackSnapshotsDestroy({ path: { uuid: id } })}
  />
);
