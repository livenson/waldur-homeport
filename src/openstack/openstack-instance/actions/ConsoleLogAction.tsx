import { openstackInstancesConsoleLogRetrieve } from '@waldur/api';
import { validateState } from '@waldur/resource/actions/base';
import { OpenConsoleLogActionItem } from '@waldur/resource/actions/OpenConsoleLogActionItem';
import { ActionItemType } from '@waldur/resource/actions/types';

const validators = [validateState('OK')];

export const ConsoleLogAction: ActionItemType = ({ resource }) => (
  <OpenConsoleLogActionItem
    apiMethod={(uuid) =>
      openstackInstancesConsoleLogRetrieve({ path: { uuid } }).then(
        (response) => response.data,
      )
    }
    validators={validators}
    resource={resource}
  />
);
