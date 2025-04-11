import { get } from 'lodash-es';

import { CheckOrX } from '@waldur/core/CheckOrX';
import { SecretField } from '@waldur/form';
import { AwesomeCheckboxField } from '@waldur/form/AwesomeCheckboxField';
import FormTable from '@waldur/form/FormTable';
import { SecretField as PlainSecretField } from '@waldur/marketplace/common/SecretField';
import { FieldEditButton } from '@waldur/marketplace/offerings/update/integration/FieldEditButton';
import { OfferingEditPanelFormProps } from '@waldur/marketplace/offerings/update/integration/types';

export interface OfferingEditField {
  key: string;
  label: string;
  description?: string;
  component?: any;
  fieldProps?: any;
  disabled?: boolean;
  hideLabel?: boolean;
  warnTooltip?: string;
  value?(value: any): any;
}

export const DefaultOfferingEditPanel = (
  props: { fields: OfferingEditField[] } & OfferingEditPanelFormProps,
) => (
  <>
    {props.fields.map((field) => (
      <FormTable.Item
        key={field.key}
        label={field.label}
        description={field.description}
        value={
          field.value ? (
            field.value(get(props.offering, field.key))
          ) : field.component === SecretField ? (
            <PlainSecretField value={get(props.offering, field.key)} />
          ) : field.component === AwesomeCheckboxField ? (
            <CheckOrX value={get(props.offering, field.key)} />
          ) : (
            get(props.offering, field.key, 'N/A')
          )
        }
        required={field.fieldProps?.required}
        disabled={field.disabled}
        warnTooltip={field.warnTooltip}
        actions={
          <FieldEditButton
            title={field.label}
            scope={props.offering}
            name={field.key}
            callback={props.callback}
            fieldComponent={field.component}
            fieldProps={field.fieldProps}
            hideLabel={field.hideLabel}
          />
        }
      />
    ))}
  </>
);
