import { useSelector } from 'react-redux';
import { Field } from 'redux-form';

import { required } from '@waldur/core/validators';
import { VStepperFormStepCard } from '@waldur/form/VStepperFormStep';
import { translate } from '@waldur/i18n';
import {
  formatIntField,
  parseIntField,
} from '@waldur/marketplace/common/utils';
import { FormStepProps } from '@waldur/marketplace/deploy/types';
import { offeringSelector } from '@waldur/marketplace/details/selectors';
import { FormGroup } from '@waldur/marketplace/offerings/FormGroup';

import { InstallLonghornField } from './InstallLonghornField';
import { IntegerUnitField } from './IntegerUnitField';

export const FormOptionalServicesStep = (props: FormStepProps) => {
  const enabled: boolean = useSelector((state) =>
    offeringSelector(state, 'attributes.install_longhorn'),
  );

  return (
    <VStepperFormStepCard
      title={translate('Optional')}
      id={props.id}
      disabled={props.disabled}
      disabledTooltip={props.disabledTooltip}
    >
      <InstallLonghornField />
      {enabled ? (
        <FormGroup label={translate('Longhorn volume size')} required={true}>
          <Field
            name="attributes.longhorn_volume_size"
            units={translate('GB')}
            component={IntegerUnitField}
            parse={parseIntField}
            format={formatIntField}
            validate={required}
          />
        </FormGroup>
      ) : null}
    </VStepperFormStepCard>
  );
};
