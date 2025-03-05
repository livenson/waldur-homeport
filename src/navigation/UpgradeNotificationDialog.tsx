import { Info } from '@phosphor-icons/react';
import { FunctionComponent } from 'react';

import { translate } from '@waldur/i18n';
import { CloseDialogButton } from '@waldur/modal/CloseDialogButton';
import { ModalDialog } from '@waldur/modal/ModalDialog';

interface UpgradeNotificationDialogProps {
  resolve: {
    version: string;
  };
}

export const UpgradeNotificationDialog: FunctionComponent<
  UpgradeNotificationDialogProps
> = ({ resolve: { version } }) => (
  <ModalDialog
    title={translate('Upgrade available')}
    iconNode={<Info size={28} color="#04bc38" />}
  >
    <div className="modal-body">
      <p>
        {translate('Waldur {version} is now available.', {
          version,
        })}{' '}
        {translate('Visit')}{' '}
        <a
          href="https://docs.waldur.com/latest/about/CHANGELOG/"
          target="_blank"
        >
          docs.waldur.com
        </a>{' '}
        {translate('to get more information about how to perform the upgrade.')}
      </p>
    </div>
    <div className="modal-footer d-block px-4 pb-4">
      <CloseDialogButton
        label={translate('Close')}
        className="btn-success w-100 text-center"
      />
    </div>
  </ModalDialog>
);
