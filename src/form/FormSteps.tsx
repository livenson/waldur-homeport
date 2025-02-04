import { CheckCircle, WarningCircle, XCircle } from '@phosphor-icons/react';
import { FC, useMemo } from 'react';

import { Tip } from '@waldur/core/Tooltip';
import { flattenObject } from '@waldur/core/utils';
import { PageBarTabs } from '@waldur/marketplace/common/PageBarTabs';

import { FieldError } from './FieldError';
import { VStepperFormStep } from './VStepperFormStep';

export const FormSteps: FC<{
  steps: Pick<VStepperFormStep, 'label' | 'id' | 'fields'>[];
  completedSteps?: boolean[];
  errors?;
  criticalErrors?;
}> = ({ steps, completedSteps = [], errors = [], criticalErrors }) => {
  const nonRequiredErrors = useMemo(() => {
    const errorsFlatten = flattenObject(errors);
    const result = {};
    for (const key in errorsFlatten) {
      if (!errorsFlatten[key]) continue;
      if (Array.isArray(errorsFlatten[key])) {
        errorsFlatten[key].forEach((err: any) => {
          if (typeof err === 'string' && !err.includes('required')) {
            if (!(key in result)) Object.assign(result, { [key]: [] });
            result[key].push(err);
          }
        });
      } else if (
        typeof errorsFlatten[key] === 'string' &&
        !errorsFlatten[key].includes('required')
      ) {
        Object.assign(result, { [key]: errorsFlatten[key] });
      }
    }
    return result;
  }, [errors]);

  const criticalErrorsMap = useMemo(() => {
    const errorsFlatten = flattenObject(criticalErrors);
    const result = {};
    for (const key in errorsFlatten) {
      if (!errorsFlatten[key]) continue;
      if (Array.isArray(errorsFlatten[key])) {
        errorsFlatten[key].forEach((err: any) => {
          if (!(key in result)) Object.assign(result, { [key]: [] });
          result[key].push(err);
        });
      } else if (typeof errorsFlatten[key] === 'string') {
        Object.assign(result, { [key]: errorsFlatten[key] });
      }
    }
    return result;
  }, [criticalErrors]);

  const tabs = steps.map((step, i) => ({
    key: step.id,
    title: (
      <div className="d-flex justify-content-between">
        {step.label}
        {step.fields && step.fields.some((key) => criticalErrorsMap[key]) ? (
          <Tip
            label={
              <FieldError
                error={step.fields
                  .map((key) => criticalErrorsMap[key])
                  .flat()
                  .filter(Boolean)}
              />
            }
            className="stepper-icon critical-error"
            id={`stepperErrorTip-${i}`}
            placement="left"
            autoWidth
          >
            <XCircle weight="bold" className="text-danger" size={20} />
          </Tip>
        ) : step.fields && step.fields.some((key) => nonRequiredErrors[key]) ? (
          <Tip
            label={
              <FieldError
                error={step.fields
                  .map((key) => nonRequiredErrors[key])
                  .flat()
                  .filter(Boolean)}
              />
            }
            className="stepper-icon error"
            id={`stepperErrorTip-${i}`}
            placement="left"
            autoWidth
          >
            <WarningCircle weight="bold" className="text-warning" size={20} />
          </Tip>
        ) : completedSteps[i] ? (
          <CheckCircle weight="bold" className="text-success" size={20} />
        ) : null}
      </div>
    ),
  }));

  return <PageBarTabs tabs={tabs} mode="tabs-left" />;
};
