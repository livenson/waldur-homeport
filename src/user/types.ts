import { ReactNode } from 'react';

import { UserDetails } from '@waldur/workspace/types';

export interface EditUserProps {
  user: UserDetails;
  name: string;
  label?: ReactNode;
  description?: ReactNode;
  requiredMsg?: string;
  disabled?: boolean;
  protected?: boolean;
  protectedMsg?: string;
}
