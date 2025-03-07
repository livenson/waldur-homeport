import { OpenStackFlavor } from '@waldur/api';
export {
  RancherTemplateQuestion as Question,
  RancherTemplateQuestionType as QuestionType,
} from '@waldur/api';

export interface Namespace {
  url: string;
  name: string;
  uuid: string;
}

export interface RancherProject {
  url: string;
  name: string;
  uuid: string;
  namespaces: Namespace[];
}

export interface FieldProps {
  label: string;
  description?: string;
  variable: string;
  required?: boolean;
  validate?: any;
}

export type NodeRole = 'worker' | 'etcd' | 'controlplane';

export interface NodeField {
  flavor: OpenStackFlavor;
  name: string;
  roles: string[];
  units: number;
}
