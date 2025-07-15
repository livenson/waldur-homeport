import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import { Form } from 'react-final-form';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { PolicyCreateForm } from './PolicyCreateForm';

// Mock API calls and dependencies
vi.mock('@waldur/core/config', () => ({
  ENV: {
    plugins: {
      WALDUR_CORE: {
        CURRENCY_NAME: 'USD',
      },
    },
  },
}));

vi.mock('@waldur/marketplace/common/utils', () => ({
  useOrganizationGroups: vi.fn(),
}));

describe('PolicyCreateForm', () => {
  const mockOffering = {
    uuid: 'test-offering-uuid',
    url: 'test-offering-url',
    components: [
      {
        type: 'cpu',
        name: 'CPU',
        measured_unit: 'cores',
      },
      {
        type: 'ram',
        name: 'RAM',
        measured_unit: 'GB',
      },
    ],
  };

  const renderComponent = (type = 'cost', initialValues = {}) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <Form
          onSubmit={() => {}}
          initialValues={initialValues}
          mutators={{ ...arrayMutators }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <PolicyCreateForm type={type} offering={mockOffering} />
            </form>
          )}
        />
      </QueryClientProvider>,
    );
  };

  beforeEach(async () => {
    // Mock useOrganizationGroups hook
    const { useOrganizationGroups } = await import(
      '@waldur/marketplace/common/utils'
    );
    vi.mocked(useOrganizationGroups).mockReturnValue({
      isLoading: false,
      error: null,
      data: [
        { name: 'Group 1', value: 'group-1-url' },
        { name: 'Group 2', value: 'group-2-url' },
      ],
      refetch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render cost policy form correctly', () => {
    renderComponent('cost');

    expect(screen.getByText('When estimated cost reaches')).toBeInTheDocument();
    expect(screen.getByText('Then')).toBeInTheDocument();
    expect(screen.getByText('Period')).toBeInTheDocument();
    expect(screen.getByText('Organization groups')).toBeInTheDocument();
  });

  it('should render usage policy form correctly', () => {
    renderComponent('usage');

    expect(
      screen.getByText('When component limits reaches'),
    ).toBeInTheDocument();
    expect(screen.getByText('Then')).toBeInTheDocument();
    expect(screen.getByText('Period')).toBeInTheDocument();
    expect(screen.getByText('Organization groups')).toBeInTheDocument();
  });

  it('should display currency unit for cost threshold', () => {
    renderComponent('cost');

    expect(
      screen.getByPlaceholderText('Enter the cost threshold (e.g. 1000 EUR)'),
    ).toBeInTheDocument();
  });

  it('should handle loading state for organization groups', async () => {
    const { useOrganizationGroups } = await import(
      '@waldur/marketplace/common/utils'
    );
    vi.mocked(useOrganizationGroups).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
      refetch: vi.fn(),
    });

    renderComponent('cost');

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should handle error state for organization groups', async () => {
    const { useOrganizationGroups } = await import(
      '@waldur/marketplace/common/utils'
    );
    const mockRefetch = vi.fn();
    vi.mocked(useOrganizationGroups).mockReturnValue({
      isLoading: false,
      error: new Error('Failed to load'),
      data: null,
      refetch: mockRefetch,
    });

    renderComponent('cost');

    expect(
      screen.getByText('Unable to load organization groups.'),
    ).toBeInTheDocument();
  });

  it('should display submit error when provided', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Form
          onSubmit={() => {}}
          mutators={{ ...arrayMutators }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <PolicyCreateForm
                type="cost"
                offering={mockOffering}
                submitError="Test error message"
              />
            </form>
          )}
        />
      </QueryClientProvider>,
    );

    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should allow form interaction', async () => {
    renderComponent('cost');

    const costInput = screen.getByPlaceholderText(
      'Enter the cost threshold (e.g. 1000 EUR)',
    );

    await userEvent.clear(costInput);
    await userEvent.type(costInput, '1000');

    await waitFor(() => {
      expect(costInput).toHaveValue(1000);
    });
  });
});
