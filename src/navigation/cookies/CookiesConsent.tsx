import { useCurrentStateAndParams } from '@uirouter/react';
import { useState, FunctionComponent, useEffect } from 'react';

import { initMatomoTracker, MatomoInstance } from '@waldur/afterBootstrap';
import { lazyComponent } from '@waldur/core/lazyComponent';
import { useModal } from '@waldur/modal/hooks';

import { getConsent, setConsent } from './CookiesStorage';

const CookiesConsentDialog = lazyComponent(() =>
  import('./CookiesConsentDialog').then((module) => ({
    default: module.CookiesConsentDialog,
  })),
);

export const CookiesConsent: FunctionComponent = () => {
  const { state } = useCurrentStateAndParams();
  const { openDialog, closeDialog } = useModal();
  const [accepted, setAccepted] = useState(
    ['true', 'essential'].includes(getConsent()),
  );

  const hideConsent = (onlyEssential) => {
    setAccepted(true);
    setConsent(onlyEssential ? 'essential' : 'true');
    closeDialog();
    if (!onlyEssential && !MatomoInstance) {
      initMatomoTracker();
    }
  };

  useEffect(() => {
    if (state.name === 'about.privacy') return;
    if (!accepted) {
      openDialog(CookiesConsentDialog, {
        resolve: {
          acceptAll: () => hideConsent(false),
          acceptEssential: () => hideConsent(true),
        },
        backdrop: 'static',
      });
    }
  }, [accepted, state, openDialog, hideConsent]);

  return null;
};
