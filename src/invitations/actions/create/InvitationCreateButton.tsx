import { At, Share } from '@phosphor-icons/react';
import { FC } from 'react';

import { translate } from '@waldur/i18n';
import { ActionItem } from '@waldur/resource/actions/ActionItem';
import { ActionButton } from '@waldur/table/ActionButton';

import { InvitationContext } from '../types';
import { useCreateInvitation } from '../useCreateInvitation';

interface InvitationCreateButtonProps
  extends Omit<InvitationContext, 'customer' | 'user'> {
  asDropdownItem?: boolean;
}

export const InvitationCreateButton: FC<InvitationCreateButtonProps> = ({
  asDropdownItem,
  ...context
}) => {
  const { callback, canInvite } = useCreateInvitation(context);

  const tooltip = !canInvite
    ? translate("You don't have enough privileges to perform this operation.")
    : null;

  return asDropdownItem ? (
    <ActionItem
      action={callback}
      title={translate('Invite by mail')}
      iconNode={<At weight="bold" />}
      disabled={!canInvite}
      tooltip={tooltip}
    />
  ) : (
    <ActionButton
      action={callback}
      title={translate('Invite member')}
      iconNode={<Share />}
      disabled={!canInvite}
      tooltip={tooltip}
    />
  );
};
