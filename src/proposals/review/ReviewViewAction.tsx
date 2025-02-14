import { Eye } from '@phosphor-icons/react';

import { translate } from '@waldur/i18n';
import { ActionItem } from '@waldur/resource/actions/ActionItem';
import { router } from '@waldur/router';

export const ReviewViewAction = ({ row }) => {
  const callback = () => {
    router.stateService.go('proposal-review-view', { review_uuid: row.uuid });
  };

  return (
    <ActionItem
      title={translate('View')}
      action={callback}
      iconNode={<Eye />}
    />
  );
};
