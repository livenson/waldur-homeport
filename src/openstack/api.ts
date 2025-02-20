import { getAll, post, put } from '@waldur/core/api';
import { terminateResource } from '@waldur/marketplace/common/api';
import {
  Flavor,
  FloatingIp,
  Image,
  OpenStackInstance,
  Subnet,
} from '@waldur/openstack/openstack-instance/types';
import { SecurityGroup } from '@waldur/openstack/openstack-security-groups/types';

import {
  EthernetType,
  SecurityGroupDirection,
  SecurityGroupProtocol,
  ServerGroupType,
  VolumeType,
} from './types';

export interface BackupRestoreRequestBody {
  flavor: string;
  ports: {
    subnet: string;
  }[];
  floating_ips: {
    subnet: string;
    url?: string;
  }[];
  security_groups: {
    url: string;
  }[];
}

interface CreateSecurityGroupRuleRequestBody {
  ethertype: EthernetType;
  direction: SecurityGroupDirection;
  protocol: SecurityGroupProtocol;
  from_port: number;
  to_port: number;
  port_range?: { min: number; max: number };
  cidr: string;
  remote_group?: string;
  description?: string;
}

export interface CreateSecurityGroupRequestBody {
  name: string;
  description?: string;
  rules: CreateSecurityGroupRuleRequestBody[];
}

export interface DestroyInstanceParams {
  delete_volumes?: boolean;
  release_floating_ips?: boolean;
}

export const pullTenant = (id: string) =>
  post(`/openstack-tenants/${id}/pull/`);

export const pullFloatingIP = (id: string) =>
  post(`/openstack-floating-ips/${id}/pull/`);

export const pullSubnet = (id: string) =>
  post(`/openstack-subnets/${id}/pull/`);

export const connectSubnet = (id: string) =>
  post(`/openstack-subnets/${id}/connect/`);

export const disconnectSubnet = (id: string) =>
  post(`/openstack-subnets/${id}/disconnect/`);

export const pullSecurityGroup = (id: string) =>
  post(`/openstack-security-groups/${id}/pull/`);

export const pullServerGroup = (id: string) =>
  post(`/openstack-server-groups/${id}/pull/`);

export const pullNetwork = (id: string) =>
  post(`/openstack-networks/${id}/pull/`);

export const pullSnapshot = (id: string) =>
  post(`/openstack-snapshots/${id}/pull/`);

export const pullInstance = (id: string) =>
  post(`/openstack-instances/${id}/pull/`);

export const loadFlavors = (params) =>
  getAll<Flavor>('/openstack-flavors/', { params });

export const loadImages = (params) =>
  getAll<Image>('/openstack-images/', { params });

export const loadSecurityGroups = (params) =>
  getAll<SecurityGroup>('/openstack-security-groups/', {
    params,
  });

export const loadSecurityGroupsResources = (params?) =>
  getAll<SecurityGroup>('/openstack-security-groups/', { params });

export const loadServerGroupsResources = (params?) =>
  getAll<ServerGroupType>('/openstack-server-groups/', { params });

export const updateSecurityGroup = (id: string, data) =>
  put(`/openstack-security-groups/${id}/`, data);

export const loadVolumeTypes = (params) =>
  getAll<VolumeType>('/openstack-volume-types/', {
    params,
  });

export const loadSubnets = (params) =>
  getAll<Subnet>('/openstack-subnets/', { params });

export const loadFloatingIps = (params) =>
  getAll<FloatingIp>('/openstack-floating-ips/', {
    params,
  });

export const getInstances = (params) =>
  getAll<OpenStackInstance>('/openstack-instances/', {
    params,
  });

export const updateTenant = (id: string, data) =>
  put(`/openstack-tenants/${id}/`, data);

export const pullTenantSecurityGroups = (id: string) =>
  post(`/openstack-tenants/${id}/pull_security_groups/`);

export const pullTenantServerGroups = (id: string) =>
  post(`/openstack-tenants/${id}/pull_server_groups/`);

export const pullTenantFloatingIps = (id: string) =>
  post(`/openstack-tenants/${id}/pull_floating_ips/`);

export const updateNetwork = (id: string, data) =>
  put(`/openstack-networks/${id}/`, data);

export const updateSubnet = (id: string, data) =>
  put(`/openstack-subnets/${id}/`, data);

export const updateInstance = (id: string, data) =>
  put(`/openstack-instances/${id}/`, data);

export const destroyInstance = (
  id: string,
  attributes: DestroyInstanceParams,
) => terminateResource(id, { attributes });

export const forceDestroyInstance = (
  id: string,
  attributes: DestroyInstanceParams,
) =>
  terminateResource(id, {
    attributes: { action: 'force_destroy', ...attributes },
  });

export const updateVolume = (id: string, data) =>
  put(`/openstack-volumes/${id}/`, data);

export const retypeVolume = (id: string, data) =>
  post(`/openstack-volumes/${id}/retype/`, data);

export const updateSnapshot = (id: string, data) =>
  put(`/openstack-snapshots/${id}/`, data);

export const restoreSnapshot = (id: string, data) =>
  post(`/openstack-snapshots/${id}/restore/`, data);

export const updateBackup = (id: string, data) =>
  put(`/openstack-backups/${id}/`, data);

export const createBackup = (id: string, data) =>
  post(`/openstack-instances/${id}/backup/`, data);

export const pullVolume = (id: string) =>
  post(`/openstack-volumes/${id}/pull/`);

export const detachVolume = (id: string) =>
  post(`/openstack-volumes/${id}/detach/`);

export const runMigration = (id) => post(`/openstack-migrations/${id}/run/`);
