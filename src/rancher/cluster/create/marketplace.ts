import { flatMapDeep, range } from 'lodash-es';

import { lazyComponent } from '@waldur/core/lazyComponent';
import { translate } from '@waldur/i18n';
import { OfferingConfiguration } from '@waldur/marketplace/common/types';

import { MANAGED_RANCHER, MARKETPLACE_RANCHER } from './constants';
import { RANCHER_NODE_ROLES } from './RANCHER_NODE_ROLES';

const RancherClusterCheckoutSummary = lazyComponent(() =>
  import('./RancherClusterCheckoutSummary').then((module) => ({
    default: module.RancherClusterCheckoutSummary,
  })),
);
const RancherPluginOptionsForm = lazyComponent(() =>
  import('./RancherPluginOptionsForm').then((module) => ({
    default: module.RancherPluginOptionsForm,
  })),
);
const RancherOrderForm = lazyComponent(() =>
  import('./RancherOrderForm').then((module) => ({
    default: module.RancherOrderForm,
  })),
);

const ManagedRancherPluginOptionsForm = lazyComponent(() =>
  import('./ManagedRancherPluginOptionsForm').then((module) => ({
    default: module.ManagedRancherPluginOptionsForm,
  })),
);

const ManagedRancherSecretOptionsForm = lazyComponent(() =>
  import('./ManagedRancherSecretOptionsForm').then((module) => ({
    default: module.ManagedRancherSecretOptionsForm,
  })),
);

const ManagedRancherOrderForm = lazyComponent(() =>
  import('./ManagedRancherOrderForm').then((module) => ({
    default: module.ManagedRancherOrderForm,
  })),
);

const serializeDataVolume = ({ size, ...volumeRest }) => ({
  ...volumeRest,
  size: size * 1024,
});

const serializeNode =
  (subnet) =>
  ({ system_volume_size, flavor, ...nodeRest }) => ({
    ...nodeRest,
    system_volume_size: system_volume_size * 1024,
    flavor: flavor ? flavor.url : undefined,
    subnet,
    data_volumes: (nodeRest.data_volumes || []).map(serializeDataVolume),
  });

const standaloneRancherOrderSerializer = ({
  subnet,
  nodes,
  ssh_public_key,
  security_groups,
  tenant,
  ...clusterRest
}) => ({
  ...clusterRest,
  nodes: nodes ? nodes.map(serializeNode(subnet)) : undefined,
  ssh_public_key: ssh_public_key ? ssh_public_key.url : undefined,
  security_groups: security_groups
    ? security_groups.map((group) => ({ url: group.url }))
    : undefined,
  tenant: tenant ? tenant.url : undefined,
});

const managedRancherOrderSerializer = ({ nodes }) => ({
  nodes: flatMapDeep(RANCHER_NODE_ROLES, (role) =>
    range(nodes[role.name]?.count).map(() => ({
      flavor_name: nodes[role.name]?.flavor?.name,
      roles: [role.name],
      system_volume_size: nodes[role.name]?.system_volume_size * 1024,
    })),
  ),
});

export const RancherOffering: OfferingConfiguration = {
  type: MARKETPLACE_RANCHER,
  get label() {
    return translate('Rancher cluster');
  },
  orderFormComponent: RancherOrderForm,
  checkoutSummaryComponent: RancherClusterCheckoutSummary,
  pluginOptionsForm: RancherPluginOptionsForm,
  providerType: 'Rancher',
  serializer: standaloneRancherOrderSerializer,
  allowToUpdateService: true,
};

export const ManagedRancherOffering: OfferingConfiguration = {
  type: MANAGED_RANCHER,
  get label() {
    return translate('Managed Rancher cluster');
  },
  pluginOptionsForm: ManagedRancherPluginOptionsForm,
  secretOptionsForm: ManagedRancherSecretOptionsForm,
  orderFormComponent: ManagedRancherOrderForm,
  serializer: managedRancherOrderSerializer,
  secretOptionsSerializer: ({ customer_uuid, ...formData }) => ({
    ...formData,
    customer_uuid: customer_uuid ? customer_uuid.uuid : undefined,
  }),
  pluginOptionsSerializer: (formData) => ({
    ...formData,
    openstack_offering_uuid_list: formData.openstack_offering_uuid_list
      ? formData.openstack_offering_uuid_list.map((offering) => offering.uuid)
      : [],
    managed_rancher_server_flavor_name:
      formData.managed_rancher_server_flavor_name?.name,
    managed_rancher_system_volume_type_name:
      formData.managed_rancher_system_volume_type_name?.name,
  }),
};
