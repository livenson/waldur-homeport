import { FunctionComponent } from 'react';
import { marketplacePublicOfferingsList } from 'waldur-js-client';

import { parseSelectData } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';
import { AsyncSelectField } from '@waldur/form/AsyncSelectField';
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
];

export const ManagedRancherPluginOptionsForm: FunctionComponent<
  OfferingEditPanelFormProps
> = (props) => <DefaultOfferingEditPanel fields={fields} {...props} />;
