import { PublicOfferingDetails } from '@waldur/api';
import {
  VStepperFormStep,
  VStepperFormStepProps,
} from '@waldur/form/VStepperFormStep';

import { Offering } from '../types';

export interface FormStepProps extends VStepperFormStepProps {
  offering: PublicOfferingDetails;
  previewMode?: boolean;
}

export type OfferingConfigurationFormStep = VStepperFormStep<FormStepProps>;

export interface CheckoutSummaryProps {
  offering: Offering;
  updateMode?: boolean;
}
