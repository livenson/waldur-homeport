import { ReactNode } from 'react';

import { translate } from '@waldur/i18n';

import './LoginButton.css';

interface LoginButtonProps {
  image?: ReactNode;
  icon?: ReactNode;
  label: string;
  onClick?(): void;
}

export const LoginButton = ({
  image,
  icon,
  label,
  onClick,
}: LoginButtonProps) => (
  <button className="login-button" onClick={onClick} type="button">
    <div className="login-button-icon">
      {image}
      {icon && <span className="svg-icon">{icon}</span>}
    </div>
    <div className="login-button-text">
      {translate('Sign in with {label}', { label })}
    </div>
  </button>
);
