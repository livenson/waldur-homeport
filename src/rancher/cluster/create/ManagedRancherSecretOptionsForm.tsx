import { FunctionComponent } from 'react';
import { customersList } from 'waldur-js-client';

import { parseSelectData } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';
import { required } from '@waldur/core/validators';
import { SecretField, StringField } from '@waldur/form';
import { AsyncSelectField } from '@waldur/form/AsyncSelectField';
import { translate } from '@waldur/i18n';
import {
  DefaultOfferingEditPanel,
  OfferingEditField,
} from '@waldur/marketplace/offerings/update/DefaultOfferingEditPanel';
import { OfferingEditPanelFormProps } from '@waldur/marketplace/offerings/update/integration/types';

const fields: OfferingEditField[] = [
  {
    label: translate('Organization'),
    key: 'secret_options.customer_uuid',
    component: AsyncSelectField,
    description: translate('Organization where project can be created'),
    fieldProps: {
      loadOptions: (query, prevOptions, currentPage) =>
        customersList({
          query: {
            name: query,
            page: currentPage,
            field: ['name', 'uuid'],
          },
        }).then((response) =>
          returnReactSelectAsyncPaginateObject(
            parseSelectData(response),
            prevOptions,
            currentPage,
          ),
        ),
      getOptionLabel: ({ name }) => name,
      getOptionKey: ({ uuid }) => uuid,
      required: true,
      validate: [required],
    },
  },
  {
    label: translate('Rancher server URL'),
    key: 'secret_options.backend_url',
    component: StringField,
    fieldProps: { required: true, validate: required },
  },
  {
    label: translate('Rancher access key'),
    key: 'secret_options.username',
    component: StringField,
    fieldProps: { required: true, validate: required },
  },
  {
    label: translate('Rancher secret key'),
    key: 'secret_options.password',
    component: SecretField,
    fieldProps: { required: true, validate: required },
  },
];

export const ManagedRancherSecretOptionsForm: FunctionComponent<
  OfferingEditPanelFormProps
> = (props) => <DefaultOfferingEditPanel fields={fields} {...props} />;
