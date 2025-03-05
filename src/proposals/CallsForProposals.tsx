import { FunctionComponent } from 'react';

import { ENV } from '@waldur/configs/default';
import { Link } from '@waldur/core/Link';
import { LandingHeroSection } from '@waldur/dashboard/hero/LandingHeroSection';
import { NewbiesGuideNotification } from '@waldur/dashboard/hero/NewbiesGuideNotification';
import { translate } from '@waldur/i18n';
import { isExperimentalUiComponentsVisible } from '@waldur/marketplace/utils';
import { useFullPage } from '@waldur/navigation/context';
import { CallsAvailableOfferingsList } from '@waldur/proposals/CallsAvailableOfferingsList';
import { CallsForProposalsList } from '@waldur/proposals/CallsForProposalsList';
import { useTheme } from '@waldur/theme/useTheme';

export const CallsForProposals: FunctionComponent = () => {
  useFullPage();
  const showExperimentalUiComponents = isExperimentalUiComponentsVisible();

  const { theme } = useTheme();
  const sidebarTheme = ENV.plugins.WALDUR_CORE.SIDEBAR_STYLE || 'dark';

  const darkButtons =
    theme === 'light' && ['accent', 'light'].includes(sidebarTheme);

  return (
    <>
      {showExperimentalUiComponents && (
        <NewbiesGuideNotification
          guideState="calls-for-proposals-dashboard"
          message={translate('New to {org} calls page?', {
            org: ENV.plugins.WALDUR_CORE.SHORT_PAGE_TITLE,
          })}
        />
      )}
      <LandingHeroSection
        header={ENV.plugins.WALDUR_CORE.SHORT_PAGE_TITLE}
        title={translate('Calls for proposals')}
        context="calls"
      >
        <div className="d-flex justify-content-center gap-5">
          <Link
            state="calls-for-proposals-all-available-offerings"
            className={
              'btn btn-outline w-200px ' +
              ('btn-outline-' + (darkButtons ? 'dark' : 'white'))
            }
          >
            {translate('Available offerings')}
          </Link>
          <Link
            state="calls-for-proposals-all-calls"
            className={
              'btn w-200px ' +
              (darkButtons ? 'btn-dark' : 'btn-white btn-active-text-dark')
            }
          >
            {translate('See all calls')}
          </Link>
        </div>
      </LandingHeroSection>
      <div className="container-fluid my-14">
        <CallsForProposalsList />
      </div>
      <div className="container-fluid my-14">
        <CallsAvailableOfferingsList />
      </div>
    </>
  );
};
