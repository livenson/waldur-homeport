import { Customer, Project, PublicOfferingDetails } from 'waldur-js-client';

import {
  VStepperFormStep,
  VStepperFormStepProps,
} from '@waldur/form/VStepperFormStep';

import { Limits } from '../common/types';
import { AttributesType, Plan } from '../types';

export interface FormStepProps extends VStepperFormStepProps {
  offering: PublicOfferingDetails;
  previewMode?: boolean;
}

export type OfferingConfigurationFormStep = VStepperFormStep<FormStepProps>;

export interface CheckoutSummaryProps {
  offering: PublicOfferingDetails;
  updateMode?: boolean;
}

export interface DeployFormData {
  project?: Pick<Project, 'uuid' | 'name' | 'end_date' | 'url'>;
  customer?: Pick<Customer, 'uuid' | 'name' | 'url' | 'payment_profiles'>;
  offering?;
  attributes?: AttributesType;
  limits?: Limits;
  plan?: Plan;
}
