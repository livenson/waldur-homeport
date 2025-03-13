import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { slurmAllocationUserUsageList } from 'waldur-js-client';

import * as marketplaceApi from '@waldur/marketplace/common/api';

import componentUsages from './fixtures/component-usages.json';
import userUsages from './fixtures/user-usages.json';
import { loadCharts } from './utils';

vi.mock('waldur-js-client');
vi.mock('@waldur/marketplace/common/api');

describe('SLURM allocation usage chart formatter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  beforeEach(() => {
    vi.setSystemTime(new Date(2020, 6, 1));
    vi.mocked(slurmAllocationUserUsageList).mockResolvedValue({
      // @ts-ignore
      data: userUsages,
    });
    vi.mocked(marketplaceApi).getComponentUsages.mockResolvedValue(
      // @ts-ignore
      componentUsages,
    );
  });

  it('parses data and returns eChart option correctly', async () => {
    const charts = await loadCharts('allocationUrl', 'resourceUuid');
    expect(charts).toMatchSnapshot();
  });
});
