import { deleteById, get, getAll, getById, post, put } from '@waldur/core/api';

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

interface CreatePortRequestBody {
  name: string;
  network: string;
}

export const createDisk = (id: string, size: number) =>
  post(`/vmware-virtual-machine/${id}/create_disk/`, { size });

export const createPort = (id: string, data: CreatePortRequestBody) =>
  post(`/vmware-virtual-machine/${id}/create_port/`, data);

export const pullPort = (id: string) => post(`/vmware-ports/${id}/pull/`);

export const pullDisk = (id: string) => post(`/vmware-disks/${id}/pull/`);

export const pullVirtualMachine = (id: string) =>
  post(`/vmware-virtual-machine/${id}/pull/`);

export const updateVirtualMachine = (id: string, data) =>
  put(`/vmware-virtual-machine/${id}/`, data);

export const getVirtualMachineConsoleUrl = (id: string) =>
  get<{ url: string }>(`/vmware-virtual-machine/${id}/console/`).then(
    (response) => response.data.url,
  );

export const destroyVirtualMachine = (id: string) =>
  deleteById('/vmware-virtual-machine/', id);
