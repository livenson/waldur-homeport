import { getAll } from '@waldur/core/api';

import { VMwareTemplate } from './types';

export const getVMwareTemplates = (
  settings_uuid: string,
  customer_uuid: string,
) =>
  getAll<VMwareTemplate>('/vmware-templates/', {
    params: { settings_uuid, customer_uuid },
  });

export const loadVMwareAdvancedOptions = async (props: {
  settings_uuid: string;
  customer_uuid: string;
}) => {
  const options = {
    params: {
      settings_uuid: props.settings_uuid,
      customer_uuid: props.customer_uuid,
    },
  };
  const [clusters, datastores, folders] = await Promise.all([
    getAll('/vmware-clusters/', options),
    getAll('/vmware-datastores/', options),
    getAll('/vmware-folders/', options),
  ]);
  return {
    clusters,
    datastores,
    folders,
  };
};
