import { FunctionComponent } from 'react';

import { required } from '@waldur/core/validators';
import { SecretField, StringField, TextField } from '@waldur/form';
import { translate } from '@waldur/i18n';
import {
  DefaultOfferingEditPanel,
  OfferingEditField,
} from '@waldur/marketplace/offerings/update/DefaultOfferingEditPanel';
import { OfferingEditPanelFormProps } from '@waldur/marketplace/offerings/update/integration/types';

const fields: OfferingEditField[] = [
  {
    label: translate('Rancher server URL'),
    key: 'service_attributes.backend_url',
    component: StringField,
    fieldProps: { required: true, validate: required },
  },
  {
    label: translate('Rancher access key'),
    key: 'service_attributes.username',
    component: StringField,
    fieldProps: { required: true, validate: required },
  },
  {
    label: translate('Rancher secret key'),
    key: 'service_attributes.password',
    component: SecretField,
    fieldProps: { required: true, validate: required },
  },
  {
    label: translate('Base image name'),
    key: 'service_attributes.base_image_name',
    component: StringField,
    fieldProps: { required: true, validate: required },
  },
  {
    label: translate('Cloud init template'),
    key: 'service_attributes.cloud_init_template',
    component: TextField,
  },
];

export const RancherProviderForm: FunctionComponent<
  OfferingEditPanelFormProps
> = (props) => <DefaultOfferingEditPanel fields={fields} {...props} />;
