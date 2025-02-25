import { ComponentType, ReactNode } from 'react';

export interface PageBarTab {
  key: string;
  title: ReactNode;
  component?: ComponentType<any>;
  /** The default key that will be activated when the parent is clicked. It can be the key of one of the children. */
  defaultKey?: string;
  disabled?: boolean;
  visible?: boolean;
  children?: Omit<PageBarTab, 'children' | 'defaultKey'>[];
}

export interface IBreadcrumbItem {
  key: string;
  text: string;
  dropdown?: ReactNode | ((close: () => void) => ReactNode);
  hideDropdownArrow?: boolean;
  active?: boolean;
  to?: string;
  params?: object;
  onClick?(): void;
  ellipsis?: 'md' | 'xl' | 'xxl';
  truncate?: boolean;
  maxLength?: number;
}
