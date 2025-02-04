import React, { FC, PropsWithChildren } from 'react';
import { Card } from 'react-bootstrap';

import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { RefreshButton } from '@waldur/marketplace/offerings/update/components/RefreshButton';

export interface VStepperFormStep<T = VStepperFormStepProps> {
  label: string;
  id: string;
  component: React.ComponentType<T>;
  params?: Record<string, any>;
  fields?: Array<string>;
  required?: boolean;
  requiredFields?: Array<string>;
  isActive?: (data?: any) => boolean;
}

export interface VStepperFormStepProps {
  id: string;
  title?: string;
  disabled?: boolean;
  change?(field: string, value: any): void;
  params?: VStepperFormStep['params'];
}

interface StepCardProps {
  title: string;
  actions?: React.ReactNode;
  id?: string;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  refetch?(): void;
  refetching?: boolean;
}

export const VStepperFormStepCard: FC<PropsWithChildren<StepCardProps>> = (
  props,
) => {
  return (
    <Card
      className={'step-card card-bordered ' + (props.className || '')}
      id={props.id}
    >
      <Card.Header className="gap-2">
        <div className="d-flex align-items-center me-2">
          <h4 className="mb-0">{props.title}</h4>
          {props.refetch && (
            <div className="ms-2">
              <RefreshButton
                loading={props.refetching}
                refetch={props.refetch}
              />
            </div>
          )}
        </div>
        {props.actions && (
          <div className="d-flex flex-grow-1">{props.actions}</div>
        )}
      </Card.Header>
      <Card.Body className="position-relative">
        {props.disabled && (
          <div className="blocker position-absolute z-index-1 w-100 h-100 cursor-not-allowed" />
        )}
        {props.loading ? <LoadingSpinner /> : props.children}
      </Card.Body>
    </Card>
  );
};
