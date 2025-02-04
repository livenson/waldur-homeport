import { AccordionCard } from '@waldur/core/AccordionCard';
import { OptionsForm } from '@waldur/marketplace/common/OptionsForm';

import { FormStepProps } from '../types';

export const FormAdditionalConfigurationStep = (props: FormStepProps) => (
  <AccordionCard
    title={props.title}
    id={props.id}
    className="step-card"
    defaultOpen
  >
    <OptionsForm options={props.offering.options} />
  </AccordionCard>
);
