import { WarningCircle } from '@phosphor-icons/react';
import { Card } from 'react-bootstrap';

import { RadarIcon } from '@waldur/core/RadarIcon';
import { translate } from '@waldur/i18n';

export const AcceptTosWarning = () => (
  <Card className="card-bordered mt-3 rounded-3">
    <Card.Body className="d-flex px-2">
      <RadarIcon
        IconComponent={WarningCircle}
        variant="warning"
        className="me-2"
      />
      <div>
        <p className="mb-0 fw-bold">
          {translate('Actions required')}:{' '}
          {translate('Accept term and conditions')}
        </p>
        <p className="mb-0 text-muted">
          {translate(
            'You must accept the terms of service and privacy policy to access all features. To accept, please check the box below.',
          )}
        </p>
      </div>
    </Card.Body>
  </Card>
);
