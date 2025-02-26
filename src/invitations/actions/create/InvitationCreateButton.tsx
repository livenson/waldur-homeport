import { Share } from '@phosphor-icons/react';
import { FunctionComponent } from 'react';

import { translate } from '@waldur/i18n';
import { ActionButton } from '@waldur/table/ActionButton';

import { InvitationContext } from '../types';
import { useCreateInvitation } from '../useCreateInvitation';

export const InvitationCreateButton: FunctionComponent<
  Omit<InvitationContext, 'customer' | 'user'>
> = (context) => {
  const { callback, canInvite } = useCreateInvitation(context);

  return (
    <ActionButton
      action={callback}
      title={translate('Invite member')}
      iconNode={<Share />}
      disabled={!canInvite}
    />
  );
};
