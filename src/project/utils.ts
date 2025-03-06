import {
  invoiceItemsCostsList,
  marketplaceProjectEstimatedCostPoliciesList,
} from '@waldur/api';
import { defaultCurrency } from '@waldur/core/formatCurrency';
import { getCostPolicyActionOptions } from '@waldur/customer/cost-policies/utils';
import { formatCostChart, getTeamSizeChart } from '@waldur/dashboard/api';
import {
  getLineChartOptions,
  getLineChartOptionsWithAxis,
} from '@waldur/dashboard/chart';
import { translate } from '@waldur/i18n';
import { PermissionEnum } from '@waldur/permissions/enums';
import { hasPermission } from '@waldur/permissions/hasPermission';
import { Project, User } from '@waldur/workspace/types';

export async function loadChart(project: Project, withAxis = false) {
  const [invoices, costPolicies] = await Promise.all([
    invoiceItemsCostsList({
      query: {
        project_uuid: project.uuid,
        page: 1,
        page_size: 12,
      },
    }).then((response) => response.data),
    marketplaceProjectEstimatedCostPoliciesList({
      query: {
        scope_uuid: project.uuid,
        page: 1,
        page_size: 3,
      },
    }).then((response) => response.data),
  ]);
  const chart = formatCostChart(invoices);
  return {
    chart,
    options: !withAxis
      ? getLineChartOptions(
          chart,
          (costPolicies || []).map((item) => {
            const limitCost = defaultCurrency(item.limit_cost);
            const projectCredit = item.project_credit
              ? defaultCurrency(item.project_credit)
              : null;

            const totalCost = item.limit_cost + (item.project_credit || 0);
            const totalCostFormatted = defaultCurrency(totalCost);
            const action = getCostPolicyActionOptions().find(
              (option) => option.value === item.actions,
            )?.label;

            const label = projectCredit
              ? `Policy: ${action}\n${translate('Sum')}: ${totalCostFormatted}, ${translate('Limit')}: ${limitCost}, ${translate('Credit')}: ${projectCredit}`
              : `Policy: ${action}\n${translate('Limit')}: ${limitCost}`;

            return {
              label,
              value: totalCost,
            };
          }),
        )
      : getLineChartOptionsWithAxis(chart),
  };
}

export const getProjectTeamChart = async (project: Project) => {
  const chart = await getTeamSizeChart(project);
  if (chart) {
    return {
      chart,
      options: getLineChartOptions(chart),
    };
  }
  return null;
};

export const canEditProject = (user: User, context: { customer?; project? }) =>
  hasPermission(user, {
    permission: PermissionEnum.UPDATE_PROJECT,
    customerId: context?.customer?.uuid,
  }) ||
  hasPermission(user, {
    permission: PermissionEnum.UPDATE_PROJECT,
    projectId: context?.project?.uuid,
  });

export const PROJECT_TEAM_TABLE_TABS = [
  {
    key: 'users',
    title: translate('Active'),
    state: 'project-users',
  },
  {
    key: 'project-invitations',
    title: translate('Invitations'),
    state: 'project-invitations',
  },
];
