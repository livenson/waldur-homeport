import { ComponentType, ReactNode } from 'react';

import { Offering, OfferingComponent } from '@waldur/marketplace/types';

export interface Component extends OfferingComponent {
  price: number;
  amount: number;
  prices: number[];
  subTotal: number;
}

export interface PricesData {
  components: Component[];
  periods: string[];
  total: number;
  totalPeriods: number[];
  periodKeys: string[];
}

export interface PlanDetailsTableProps extends PricesData {
  offering: Offering;
  viewMode?: boolean;
  formGroupClassName?: string;
  columnClassName?: string;
  extraTabs?: Array<{
    title: ReactNode;
    eventKey: string | number;
    component: ComponentType;
  }>;
}

export type PlanPeriod = 'monthly' | 'annual';
