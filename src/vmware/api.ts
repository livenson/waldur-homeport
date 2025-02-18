import { deleteById, get, getAll, getById, put } from '@waldur/core/api';

import { VMwareTemplate } from './types';

export const getVMwareLimits = (settingsId) =>
  getById<Record<string, number>>('/vmware-limits/', settingsId);

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

export const updateVirtualMachine = (id: string, data) =>
  put(`/vmware-virtual-machine/${id}/`, data);

export const getVirtualMachineConsoleUrl = (id: string) =>
  get<{ url: string }>(`/vmware-virtual-machine/${id}/console/`).then(
    (response) => response.data.url,
  );

export const destroyVirtualMachine = (id: string) =>
  deleteById('/vmware-virtual-machine/', id);
