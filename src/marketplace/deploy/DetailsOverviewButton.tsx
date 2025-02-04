import { Eye } from '@phosphor-icons/react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@waldur/core/lazyComponent';
import { translate } from '@waldur/i18n';
import { openModalDialog } from '@waldur/modal/actions';

const DetailsOverviewDialog = lazyComponent(() =>
  import('./DetailsOverviewDialog').then((module) => ({
    default: module.DetailsOverviewDialog,
  })),
);

export const DetailsOverviewButton = ({ offering, className = undefined }) => {
  const dispatch = useDispatch();
  return (
    <Button
      variant="outline btn-outline-default"
      className={className}
      disabled={!offering}
      onClick={() =>
        dispatch(
          openModalDialog(DetailsOverviewDialog, {
            offering,
            size: 'lg',
          }),
        )
      }
    >
      <span className="svg-icon svg-icon-2">
        <Eye weight="bold" />
      </span>
      {translate('More details')}
    </Button>
  );
};
