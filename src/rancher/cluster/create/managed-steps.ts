import { required } from '@waldur/core/validators';
import { translate } from '@waldur/i18n';
import {
  DetailsOverviewStep,
  PlanStep,
} from '@waldur/marketplace/deploy/steps/constants';
import { FormAdditionalConfigurationStep } from '@waldur/marketplace/deploy/steps/FormAdditionalConfigurationStep';
import { FormCloudStep } from '@waldur/marketplace/deploy/steps/FormCloudStep';
import { FormFinalConfigurationStep } from '@waldur/marketplace/deploy/steps/FormFinalConfigurationStep';
import { OfferingConfigurationFormStep } from '@waldur/marketplace/deploy/types';

import { MANAGED_RANCHER } from './constants';
import { FormOptionalServicesStep } from './FormOptionalServicesStep';
import { ManagedFormNodesStep } from './ManagedFormNodesStep';
import { ManagedFormOpenStackOfferingStep } from './ManagedFormOpenStackOfferingStep';
import { rancherClusterName } from './utils';

export const managedDeployOfferingSteps: OfferingConfigurationFormStep[] = [
  DetailsOverviewStep,
  PlanStep,
  {
    label: translate('Management offering'),
    id: 'step-management-offering',
    fields: ['offering'],
    required: true,
    requiredFields: ['offering'],
    component: FormCloudStep,
    params: { type: MANAGED_RANCHER },
  },
  {
    label: translate('OpenStack offering'),
    id: 'step-openstack-offerings',
    fields: ['attributes.openstack_offerings'],
    required: true,
    requiredFields: ['attributes.openstack_offerings'],
    component: ManagedFormOpenStackOfferingStep,
  },
  {
    label: translate('Worker nodes hardware configuration'),
    id: 'step-nodes',
    fields: ['attributes.nodes'],
    required: true,
    requiredFields: ['attributes.nodes'],
    component: ManagedFormNodesStep,
  },
  {
    label: translate('Optional'),
    id: 'step-optional-services',
    fields: ['attributes.install_longhorn'],
    required: false,
    component: FormOptionalServicesStep,
  },
  {
    label: translate('Additional configuration'),
    id: 'step-additional-configuration',
    required: false,
    component: FormAdditionalConfigurationStep,
    isActive: (offering) => {
      return offering.options.order?.length > 0;
    },
  },
  {
    label: translate('Final configuration'),
    id: 'step-final-configuration',
    fields: ['attributes.name', 'attributes.description'],
    required: true,
    requiredFields: ['attributes.name'],
    component: FormFinalConfigurationStep,
    params: {
      nameLabel: translate('Cluster name'),
      nameValidate: [required, rancherClusterName],
    },
  },
];
