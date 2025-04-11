import { lazyComponent } from '@waldur/core/lazyComponent';
import { translate } from '@waldur/i18n';
import { OfferingConfiguration } from '@waldur/marketplace/common/types';

import { MANAGED_RANCHER, MARKETPLACE_RANCHER } from './constants';

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

const serializer = ({
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

export const RancherOffering: OfferingConfiguration = {
  type: MARKETPLACE_RANCHER,
  get label() {
    return translate('Rancher cluster');
  },
  orderFormComponent: RancherOrderForm,
  checkoutSummaryComponent: RancherClusterCheckoutSummary,
  pluginOptionsForm: RancherPluginOptionsForm,
  providerType: 'Rancher',
  serializer,
  allowToUpdateService: true,
};

export const ManagedRancherOffering: OfferingConfiguration = {
  type: MANAGED_RANCHER,
  get label() {
    return translate('Managed Rancher cluster');
  },
  pluginOptionsForm: ManagedRancherPluginOptionsForm,
  secretOptionsForm: ManagedRancherSecretOptionsForm,
  secretOptionsSerializer: ({ customer_uuid, ...formData }) => ({
    ...formData,
    customer_uuid: customer_uuid ? customer_uuid.uuid : undefined,
  }),
  pluginOptionsSerializer: ({ openstack_offering_uuid_list, ...formData }) => ({
    ...formData,
    openstack_offering_uuid_list: openstack_offering_uuid_list
      ? openstack_offering_uuid_list.map((offering) => offering.uuid)
      : [],
  }),
};
