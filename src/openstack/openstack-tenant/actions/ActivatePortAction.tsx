import { Power } from '@phosphor-icons/react';
import {
  OpenStackPort,
  openstackPortsDisablePort,
  openstackPortsEnablePort,
} from 'waldur-js-client';

import { translate } from '@waldur/i18n';
import { AsyncActionItem } from '@waldur/resource/actions/AsyncActionItem';
import { validateState } from '@waldur/resource/actions/base';
import { ActionItemType } from '@waldur/resource/actions/types';

const validators = [validateState('OK')];

export const ActivatePortAction: ActionItemType<OpenStackPort> = ({
  resource,
  refetch,
}) => (
  <AsyncActionItem
    title={
      resource.admin_state_up === 'True'
        ? translate('Disable port')
        : translate('Enable port')
    }
    apiMethod={(uuid) =>
      resource.admin_state_up === 'True'
        ? openstackPortsDisablePort({ path: { uuid } } as any)
        : openstackPortsEnablePort({ path: { uuid } } as any)
    }
    resource={resource}
    validators={validators}
    refetch={refetch}
    iconNode={<Power weight="bold" />}
  />
);
