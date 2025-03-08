import { PublicOfferingDetails } from '@waldur/api';
import {
  VStepperFormStep,
  VStepperFormStepProps,
} from '@waldur/form/VStepperFormStep';

export interface FormStepProps extends VStepperFormStepProps {
  offering: PublicOfferingDetails;
  previewMode?: boolean;
}

export type OfferingConfigurationFormStep = VStepperFormStep<FormStepProps>;

export interface CheckoutSummaryProps {
  offering: PublicOfferingDetails;
  updateMode?: boolean;
}
