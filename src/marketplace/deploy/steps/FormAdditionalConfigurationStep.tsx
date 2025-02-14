import { useSelector } from 'react-redux';

import { AccordionCard } from '@waldur/core/AccordionCard';
import { OptionsForm } from '@waldur/marketplace/common/OptionsForm';

import { FormStepProps } from '../types';
import { formCustomerSelector } from '../utils';

export const FormAdditionalConfigurationStep = (props: FormStepProps) => {
  const customer = useSelector(formCustomerSelector);
  return (
    <AccordionCard
      title={props.title}
      id={props.id}
      className="step-card"
      defaultOpen
    >
      <OptionsForm options={props.offering.options} customer={customer} />
    </AccordionCard>
  );
};
