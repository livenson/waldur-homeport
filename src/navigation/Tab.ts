import { ReactNode } from 'react';

export interface Tab {
  title: ReactNode;
  to?: string;
  redirectTo?: string;
  params?: Record<string, any>;
  disabled?: boolean;
  children?: Tab[];
}
