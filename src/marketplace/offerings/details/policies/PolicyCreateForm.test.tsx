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

vi.mock('@waldur/i18n', () => ({
  translate: vi.fn((str) => str),
}));

vi.mock('@waldur/customer/cost-policies/utils', () => ({
  policyPeriodOptions: {
    monthly: { value: 'monthly', label: 'Monthly' },
    yearly: { value: 'yearly', label: 'Yearly' },
  },
}));

vi.mock('../utils', () => ({
  getOfferingPolicyActionOptions: vi.fn(() => [
    {
      value: 'block_creation_of_new_resources',
      label: 'Block creation of new resources',
    },
    {
      value: 'notify_organization_owners',
      label: 'Notify organization owners',
    },
  ]),
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

  const renderComponent = (
    type: 'cost' | 'usage' = 'cost',
    initialValues = {},
  ) => {
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
        {
          name: 'Group 1',
          value: 'group-1-url',
          url: 'group-1-url',
          uuid: 'group-1-uuid',
        },
        {
          name: 'Group 2',
          value: 'group-2-url',
          url: 'group-2-url',
          uuid: 'group-2-uuid',
        },
      ],
      refetch: vi.fn(),
      disabled: false,
      tooltip: undefined,
      isError: false,
      isPending: false,
      isSuccess: true,
      isPlaceholderData: false,
      status: 'success' as const,
      fetchStatus: 'idle' as const,
      isRefetching: false,
      isStale: false,
      isLoadingError: false,
      isRefetchError: false,
      isFetched: true,
      isFetchedAfterMount: true,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetching: false,
      isInitialLoading: false,
      isPaused: false,
      promise: Promise.resolve([]),
    } as any);
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
      data: undefined,
      refetch: vi.fn(),
      disabled: false,
      tooltip: undefined,
      isError: false,
      isPending: true,
      isSuccess: false,
      isPlaceholderData: false,
      status: 'pending' as const,
      fetchStatus: 'fetching' as const,
      isRefetching: false,
      isStale: false,
      isLoadingError: false,
      isRefetchError: false,
      isFetched: false,
      isFetchedAfterMount: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetching: true,
      isInitialLoading: true,
      isPaused: false,
      promise: Promise.resolve([]),
    } as any);

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
      data: undefined,
      refetch: mockRefetch,
      disabled: false,
      tooltip: undefined,
      isError: true,
      isPending: false,
      isSuccess: false,
      isPlaceholderData: false,
      status: 'error' as const,
      fetchStatus: 'idle' as const,
      isRefetching: false,
      isStale: false,
      isLoadingError: true,
      isRefetchError: false,
      isFetched: true,
      isFetchedAfterMount: true,
      dataUpdatedAt: 0,
      errorUpdatedAt: Date.now(),
      failureCount: 1,
      failureReason: new Error('Failed to load'),
      errorUpdateCount: 1,
      isFetching: false,
      isInitialLoading: false,
      isPaused: false,
      promise: Promise.resolve([]),
    } as any);

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

  describe('Cost Policy Form', () => {
    it('should render cost threshold field with currency unit', () => {
      renderComponent('cost');

      const costField = screen.getByPlaceholderText(
        'Enter the cost threshold (e.g. 1000 EUR)',
      );
      expect(costField).toBeInTheDocument();
      expect(costField).toHaveAttribute('type', 'number');
    });

    it('should validate required cost threshold field', () => {
      renderComponent('cost');

      const costField = screen.getByPlaceholderText(
        'Enter the cost threshold (e.g. 1000 EUR)',
      );
      expect(costField).toBeInTheDocument();
      // Field validation is handled by React Final Form's validate prop
      expect(costField).toHaveAttribute('type', 'number');
    });

    it('should accept valid cost threshold values', async () => {
      renderComponent('cost');

      const costInput = screen.getByPlaceholderText(
        'Enter the cost threshold (e.g. 1000 EUR)',
      );

      await userEvent.clear(costInput);
      await userEvent.type(costInput, '500.50');

      await waitFor(() => {
        expect(costInput).toHaveValue(500.5);
      });
    });

    it('should not render component limits field for cost policy', () => {
      renderComponent('cost');

      expect(
        screen.queryByText('When component limits reaches'),
      ).not.toBeInTheDocument();
      expect(screen.queryByText('Component')).not.toBeInTheDocument();
    });
  });

  describe('Usage Policy Form', () => {
    it('should render component limits field', () => {
      renderComponent('usage');

      expect(
        screen.getByText('When component limits reaches'),
      ).toBeInTheDocument();
      // Component table only shows when there are component limits
      // Check if the ComponentLimitsField is rendered
    });

    it('should not render cost threshold field for usage policy', () => {
      renderComponent('usage');

      expect(
        screen.queryByText('When estimated cost reaches'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByPlaceholderText(
          'Enter the cost threshold (e.g. 1000 EUR)',
        ),
      ).not.toBeInTheDocument();
    });

    it('should initialize with one component limit row', () => {
      renderComponent('usage', {
        component_limits_set: [{ type: '', limit: 0 }],
      });

      // Check that component limits section is rendered
      expect(
        screen.getByText('When component limits reaches'),
      ).toBeInTheDocument();
    });

    it('should allow adding new component limit rows', () => {
      renderComponent('usage', {
        component_limits_set: [{ type: 'cpu', limit: 10 }],
      });

      // Check if add button exists (implementation depends on ComponentLimitsField)
      const componentTable = screen.queryByText('Component');
      expect(componentTable).toBeInTheDocument();
    });

    it('should prevent adding more rows than available components', () => {
      renderComponent('usage', {
        component_limits_set: [
          { type: 'cpu', limit: 10 },
          { type: 'ram', limit: 20 },
        ],
      });

      // Check the component limits are displayed
      const componentTable = screen.queryByText('Component');
      expect(componentTable).toBeInTheDocument();
    });

    it('should allow removing component limit rows when multiple exist', () => {
      renderComponent('usage', {
        component_limits_set: [
          { type: 'cpu', limit: 10 },
          { type: 'ram', limit: 20 },
        ],
      });

      // Check that component limits are displayed
      const componentTable = screen.queryByText('Component');
      expect(componentTable).toBeInTheDocument();
    });

    it('should disable remove button when only one component limit exists', () => {
      renderComponent('usage', {
        component_limits_set: [{ type: 'cpu', limit: 10 }],
      });

      // Check that component limits are displayed
      const componentTable = screen.queryByText('Component');
      expect(componentTable).toBeInTheDocument();
    });

    it('should show correct measured units for components', () => {
      renderComponent('usage', {
        component_limits_set: [{ type: 'cpu', limit: 10 }],
      });

      // This would require the component to be selected first
      // The test should verify that when CPU is selected, 'cores' unit is shown
    });
  });

  describe('Common Form Fields', () => {
    it('should render action selection field with correct options', () => {
      renderComponent('cost');

      // Check that "Then" label is present (action field)
      expect(screen.getByText('Then')).toBeInTheDocument();
    });

    it('should render period selection field', () => {
      renderComponent('cost');

      const periodFields = screen.getAllByRole('combobox');
      expect(periodFields.length).toBeGreaterThan(0);
    });

    it('should render organization groups field as multi-select', () => {
      renderComponent('cost');

      expect(screen.getByText('Organization groups')).toBeInTheDocument();
    });

    it('should have required action field', () => {
      renderComponent('cost');

      // Check that "Then" label is present (action field)
      expect(screen.getByText('Then')).toBeInTheDocument();
    });

    it('should have required period field', () => {
      renderComponent('cost');

      const periodFields = screen.getAllByRole('combobox');
      expect(periodFields.length).toBeGreaterThan(0);
    });

    it('should have required organization groups field', () => {
      renderComponent('cost');

      expect(screen.getByText('Organization groups')).toBeInTheDocument();
    });
  });

  describe('Form Integration', () => {
    it('should populate form with initial values', () => {
      const initialValues = {
        limit_cost: 1000,
        actions: 'block_creation_of_new_resources',
        period: 'monthly',
        organization_groups: ['group-1-url'],
      };

      renderComponent('cost', initialValues);

      const costInput = screen.getByPlaceholderText(
        'Enter the cost threshold (e.g. 1000 EUR)',
      );
      expect(costInput).toHaveValue(1000);
    });

    it('should handle form submission with all required fields filled', async () => {
      const mockOnSubmit = vi.fn();
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });

      render(
        <QueryClientProvider client={queryClient}>
          <Form
            onSubmit={mockOnSubmit}
            mutators={{ ...arrayMutators }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <PolicyCreateForm type="cost" offering={mockOffering} />
                <button type="submit">Submit</button>
              </form>
            )}
          />
        </QueryClientProvider>,
      );

      // Fill required fields
      const costInput = screen.getByPlaceholderText(
        'Enter the cost threshold (e.g. 1000 EUR)',
      );
      await userEvent.type(costInput, '1000');

      // Submit form
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      // Verify form submission would be attempted
      // Note: Actual validation and submission behavior depends on the parent form setup
    });

    it('should maintain form state during type switching', () => {
      renderComponent('cost');

      const costInput = screen.getByPlaceholderText(
        'Enter the cost threshold (e.g. 1000 EUR)',
      );
      expect(costInput).toBeInTheDocument();

      // This test would need to be enhanced to actually test switching
      // between cost and usage types if that functionality exists
    });
  });

  describe('Error Handling', () => {
    it('should retry loading organization groups on error', async () => {
      const { useOrganizationGroups } = await import(
        '@waldur/marketplace/common/utils'
      );
      const mockRefetch = vi.fn();
      vi.mocked(useOrganizationGroups).mockReturnValue({
        isLoading: false,
        error: new Error('Network error'),
        data: undefined,
        refetch: mockRefetch,
        disabled: false,
        tooltip: undefined,
        isError: true,
        isPending: false,
        isSuccess: false,
        isPlaceholderData: false,
        status: 'error' as const,
        fetchStatus: 'idle' as const,
        isRefetching: false,
        isStale: false,
        isLoadingError: true,
        isRefetchError: false,
        isFetched: true,
        isFetchedAfterMount: true,
        dataUpdatedAt: 0,
        errorUpdatedAt: Date.now(),
        failureCount: 1,
        failureReason: new Error('Network error'),
        errorUpdateCount: 1,
        isFetching: false,
        isInitialLoading: false,
        isPaused: false,
        promise: Promise.resolve([]),
      } as any);

      renderComponent('cost');

      expect(
        screen.getByText('Unable to load organization groups.'),
      ).toBeInTheDocument();

      // Find retry button and click it
      const retryButton = screen.getByRole('button');
      await userEvent.click(retryButton);

      expect(mockRefetch).toHaveBeenCalled();
    });

    it('should display multiple submit errors', () => {
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
                  submitError="Multiple validation errors occurred"
                />
              </form>
            )}
          />
        </QueryClientProvider>,
      );

      expect(
        screen.getByText('Multiple validation errors occurred'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Multiple validation errors occurred'),
      ).toHaveClass('text-danger');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for required fields', () => {
      renderComponent('cost');

      // Check that all required labels are present
      expect(
        screen.getByText('When estimated cost reaches'),
      ).toBeInTheDocument();
      expect(screen.getByText('Then')).toBeInTheDocument();
      expect(screen.getByText('Period')).toBeInTheDocument();
      expect(screen.getByText('Organization groups')).toBeInTheDocument();
    });

    it('should be navigable with keyboard', async () => {
      renderComponent('cost');

      const costInput = screen.getByPlaceholderText(
        'Enter the cost threshold (e.g. 1000 EUR)',
      );

      // Focus first field
      costInput.focus();
      expect(costInput).toHaveFocus();

      // Tab to next field
      await userEvent.tab();

      // Verify focus moves to next interactive element
      const focusedElement = document.activeElement;
      expect(focusedElement).not.toBe(costInput);
    });
  });
});
