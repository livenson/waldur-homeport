import { FC } from 'react';

import { openstackSubnetsUpdate } from '@waldur/api';
import { translate } from '@waldur/i18n';
import { ActionDialogProps } from '@waldur/resource/actions/types';
import { UpdateResourceDialog } from '@waldur/resource/actions/UpdateResourceDialog';

import { getFields } from './fields';

export const EditSubnetDialog: FC<ActionDialogProps> = ({
  resolve: { resource, refetch },
}) => (
  <UpdateResourceDialog
    fields={getFields()}
    resource={resource}
    initialValues={{
      name: resource.name,
      description: resource.description,
      gateway_ip: resource.gateway_ip,
      disable_gateway: resource.disable_gateway,
      host_routes: resource.host_routes,
      dns_nameservers: resource.dns_nameservers,
    }}
    updateResource={(uuid, body) =>
      openstackSubnetsUpdate({ path: { uuid }, body })
    }
    verboseName={translate('OpenStack subnet')}
    refetch={refetch}
  />
);
