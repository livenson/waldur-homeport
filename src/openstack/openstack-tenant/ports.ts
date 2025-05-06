import { ActionConfiguration } from '@waldur/resource/actions/types';

import { ActivatePortAction } from './actions/ActivatePortAction';
import { DestroyPortAction } from './actions/DestroyPortAction';
import { PullPortAction } from './actions/PullPortAction';
import { TogglePortSecurityAction } from './actions/TogglePortSecurityAction';
import { UnlinkPortAction } from './actions/UnlinkPortAction';

export const OpenStackPortActions: ActionConfiguration = {
  type: 'OpenStack.Port',
  actions: [
    ActivatePortAction,
    TogglePortSecurityAction,
    PullPortAction,
    UnlinkPortAction,
    DestroyPortAction,
  ],
};
