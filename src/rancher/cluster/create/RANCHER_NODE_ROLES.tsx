import { translate } from '@waldur/i18n';

export const RANCHER_NODE_ROLES = [
  { name: 'etcd', label: translate('etcd') },
  { name: 'controlplane', label: translate('Control plane') },
  { name: 'worker', label: translate('Worker') },
];
