import { getAll, post } from '@waldur/core/api';
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

export const pullTenantFloatingIps = (id: string) =>
  post(`/openstack-tenants/${id}/pull_floating_ips/`);

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

export const createBackup = (id: string, data) =>
  post(`/openstack-instances/${id}/backup/`, data);

export const pullVolume = (id: string) =>
  post(`/openstack-volumes/${id}/pull/`);

export const runMigration = (id) => post(`/openstack-migrations/${id}/run/`);
