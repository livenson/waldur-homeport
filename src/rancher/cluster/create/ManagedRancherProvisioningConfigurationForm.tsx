import { FunctionComponent } from 'react';
import {
  customersList,
  marketplacePublicOfferingsList,
  OpenStackFlavor,
  openstackFlavorsList,
  openstackVolumeTypesList,
} from 'waldur-js-client';

import { parseSelectData } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';
import { required } from '@waldur/core/validators';
import { SecretField, StringField, TextField } from '@waldur/form';
import { AsyncSelectField } from '@waldur/form/AsyncSelectField';
import { BoxNumberField } from '@waldur/form/BoxNumberField';
import { translate } from '@waldur/i18n';
import {
  DefaultOfferingEditPanel,
  OfferingEditField,
} from '@waldur/marketplace/offerings/update/DefaultOfferingEditPanel';
import { OfferingEditPanelFormProps } from '@waldur/marketplace/offerings/update/integration/types';
import { TENANT_TYPE } from '@waldur/openstack/constants';

const fields: OfferingEditField[] = [
  {
    label: translate('OpenStack offerings'),
    key: 'plugin_options.openstack_offering_uuid_list',
    component: AsyncSelectField,
    description: translate('List of supported OpenStack offerings'),
    fieldProps: {
      loadOptions: (query, prevOptions, currentPage) =>
        marketplacePublicOfferingsList({
          query: {
            name: query,
            type: [TENANT_TYPE],
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
      isMulti: true,
    },
  },
  {
    label: translate('OpenStack flavor name for server node'),
    key: 'plugin_options.managed_rancher_server_flavor_name',
    component: AsyncSelectField,
    fieldProps: {
      loadOptions: (query, prevOptions, currentPage) =>
        openstackFlavorsList({
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
      getOptionLabel: ({ name }: OpenStackFlavor) => name,
      getOptionKey: ({ uuid }: OpenStackFlavor) => uuid,
    },
  },
  {
    label: translate('OpenStack system volume type for server node'),
    key: 'plugin_options.managed_rancher_server_system_volume_type_name',
    component: AsyncSelectField,
    fieldProps: {
      loadOptions: (query, prevOptions, currentPage) =>
        openstackVolumeTypesList({
          query: {
            name: query,
            page: currentPage,
          },
        }).then((response) =>
          returnReactSelectAsyncPaginateObject(
            parseSelectData(response),
            prevOptions,
            currentPage,
          ),
        ),
      getOptionLabel: ({ name }: OpenStackFlavor) => name,
      getOptionKey: ({ uuid }: OpenStackFlavor) => uuid,
    },
  },
  {
    label: translate('OpenStack system volume size for server node'),
    key: 'plugin_options.managed_rancher_server_system_volume_size_gb',
    component: BoxNumberField,
  },
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
  {
    label: translate('Cloud init template'),
    key: 'secret_options.cloud_init_template',
    component: TextField,
  },
];

export const ManagedRancherProvisioningConfigurationForm: FunctionComponent<
  OfferingEditPanelFormProps
> = (props) => <DefaultOfferingEditPanel fields={fields} {...props} />;
