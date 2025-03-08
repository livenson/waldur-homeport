import { ActionsDropdownComponent } from '@waldur/table/ActionsDropdown';

import { ActionsPopover } from './ActionsPopover';

export const ModalActionsButton = (props) => (
  <ActionsDropdownComponent labeled={props.labeled}>
    <ActionsPopover {...props} />
  </ActionsDropdownComponent>
);
