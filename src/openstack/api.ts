import {
  openstackFlavorsList,
  OpenstackFlavorsListData,
  openstackFloatingIpsList,
  OpenstackFloatingIpsListData,
  openstackSecurityGroupsList,
  OpenstackSecurityGroupsListData,
  openstackSubnetsList,
  OpenstackSubnetsListData,
  OpenstackVolumesListData,
  openstackVolumeTypesList,
} from '@waldur/api';
import { getAllPages } from '@waldur/core/api';

import {
  EthernetType,
  SecurityGroupDirection,
  SecurityGroupProtocol,
} from './types';

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

export interface CreateSecurityGroupFormData {
  name: string;
  description?: string;
  rules: CreateSecurityGroupRuleRequestBody[];
}

export interface DestroyInstanceParams {
  delete_volumes?: boolean;
  release_floating_ips?: boolean;
}

export const loadFlavors = (query: OpenstackFlavorsListData['query']) =>
  getAllPages((page) => openstackFlavorsList({ query: { page, ...query } }));

export const loadSecurityGroups = (
  query: OpenstackSecurityGroupsListData['query'],
) =>
  getAllPages((page) =>
    openstackSecurityGroupsList({ query: { page, ...query } }),
  );

export const loadVolumeTypes = (query: OpenstackVolumesListData['query']) =>
  getAllPages((page) =>
    openstackVolumeTypesList({ query: { page, ...query } }),
  );

export const loadSubnets = (query: OpenstackSubnetsListData['query']) =>
  getAllPages((page) => openstackSubnetsList({ query: { page, ...query } }));

export const loadFloatingIps = (query: OpenstackFloatingIpsListData['query']) =>
  getAllPages((page) =>
    openstackFloatingIpsList({ query: { page, ...query } }),
  );
