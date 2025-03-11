import {
  User,
  Project,
  Customer as SdkCustomer,
  CustomerCredit,
} from '@waldur/api';
export { User, Project, PaymentProfile, Payment } from '@waldur/api';

export interface Customer extends SdkCustomer {
  credit?: CustomerCredit;
}

export type PhoneNumber =
  | string
  | {
      national_number: string;
      country_code: string;
    };

export interface WorkspaceState {
  user: User;
  impersonatorUser: User;
  customer?: Customer;
  project?: Project;
  resource?;
}
