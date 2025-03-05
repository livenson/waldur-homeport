import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import { Card } from 'react-bootstrap';

interface PanelProps {
  title?: React.ReactNode;
  id?: string;
  actions?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  cardBordered?: boolean;
}

export const Panel: React.FC<PropsWithChildren<PanelProps>> = ({
  title,
  id,
  children,
  className,
  bodyClassName,
  cardBordered,
  actions,
}) => (
  <Card
    className={classNames(cardBordered && 'card-bordered', className)}
    id={id}
  >
    {title && (
      <Card.Header>
        <Card.Title>
          <h3>{title}</h3>
        </Card.Title>
        <div className="card-toolbar">{actions}</div>
      </Card.Header>
    )}
    <Card.Body className={bodyClassName}>{children}</Card.Body>
  </Card>
);
