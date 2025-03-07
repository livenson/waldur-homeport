export interface Quota {
  name: string;
  limit: number;
  usage: number;
  limitType?: string;
  required?: number;
}

export interface ServerGroupType {
  url: string;
  uuid: string;
  name: string;
  settings: string;
  policy: string;
  resource_type?: string;
  tenant?: string;
}

export type EthernetType = 'IPv4' | 'IPv6';

export type SecurityGroupDirection = 'ingress' | 'egress';

export type SecurityGroupProtocol = 'tcp' | 'udp' | 'icmp' | '' | null | 'any';

export interface SecurityGroupRule {
  ethertype: EthernetType;
  direction: SecurityGroupDirection;
  id: number;
  protocol: SecurityGroupProtocol;
  from_port?: number;
  to_port?: number;
  port_range?: { min: number; max: number };
  cidr: string;
  remote_group?: string;
  remote_group_name?: string;
  remote_group_uuid?: string;
  description?: string;
}
