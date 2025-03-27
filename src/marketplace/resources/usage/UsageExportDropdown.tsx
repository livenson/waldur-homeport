import { FileCsv, FilePng, FileXls, Printer } from '@phosphor-icons/react';
import { init } from 'echarts';
import { useCallback } from 'react';
import { DropdownButton } from 'react-bootstrap';

import { ENV } from '@waldur/core/config';
import { translate } from '@waldur/i18n';
import { OfferingComponent } from '@waldur/marketplace/types';
import { ActionItem } from '@waldur/resource/actions/ActionItem';
import { useNotify } from '@waldur/store/hooks';
import exportAs from '@waldur/table/exporters';
import { ExportData } from '@waldur/table/exporters/types';

import { ComponentUsage, ComponentUserUsage } from './types';
import { getEChartOptions, getFormattedUsages, getUsagePeriods } from './utils';

export interface UsageExportDropdownProps {
  resource: {
    name: string;
  };
  data: {
    components: OfferingComponent[];
    usages: ComponentUsage[];
    userUsages: ComponentUserUsage[];
  };
  months: number;
}

const exportAsPng = (props: UsageExportDropdownProps) => {
  const color = ENV.plugins.WALDUR_CORE.BRAND_COLOR;
  let exportSuccessed = false;

  props.data.components.forEach((component, index) => {
    const options = getEChartOptions(
      component,
      props.data.usages,
      props.data.userUsages,
      props.months,
      color,
    );

    const hasData = options.series.some((serie) =>
      serie.data.some((datum) => Number(datum.value) !== 0),
    );
    if (!hasData) {
      return;
    }

    Object.assign(options, { animation: false });
    Object.assign(options, {
      title: {
        text: translate('Usage history') + ' - ' + component.name,
        subtext: props.resource.name,
        left: 'center',
        textStyle: {
          fontSize: 16,
          color: '#333',
        },
        subtextStyle: {
          fontSize: 14,
          color: '#666',
        },
      },
    });

    // Create a virtual chart container only for export, remove it later
    const container = document.createElement('div');
    container.style.width = '1600px';
    container.style.height = '800px';
    document.body.appendChild(container);

    const chartInstance = init(container);
    chartInstance.setOption(options);

    const dataURL = chartInstance.getDataURL({
      type: 'png',
      backgroundColor: '#fff',
      pixelRatio: 2,
      excludeComponents: ['toolbox'],
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `usage-${component.name}-${index + 1}-${new Date().toISOString()}.png`;
    link.click();

    chartInstance.dispose();
    document.body.removeChild(container);

    exportSuccessed = true;
  });

  return exportSuccessed;
};

export const useUsageExport = (props: UsageExportDropdownProps) => {
  const { showError } = useNotify();

  return useCallback(
    (format) => {
      if (format === 'png') {
        const result = exportAsPng(props);
        if (!result) {
          showError(translate('Chart is empty'));
        }
        return;
      }

      const usages = props.data.usages;
      const userUsages = props.data.userUsages;
      const components = props.data.components;

      const exportData: ExportData = {
        fields: [],
        data: [],
      };
      // Prepare headers
      exportData.fields = [translate('Date')].concat(
        props.data.components.map(
          (c) => c.name + (c.measured_unit ? '/' + c.measured_unit : ''),
        ),
      );

      // Prepare data
      const { labels, periods } = getUsagePeriods(usages, props.months);
      const allFormattedUsages = components.map((component) =>
        getFormattedUsages(
          periods,
          usages.filter((usage) => usage.type === component.type),
          userUsages?.filter(
            (usage) => usage.component_type === component.type,
          ),
        ),
      );

      labels.forEach((label, index) => {
        const hasUsage = allFormattedUsages.some((compUsages) =>
          Number(compUsages[index]?.value),
        );
        if (hasUsage) {
          const record: any[] = [label];
          record.push(
            ...allFormattedUsages.map(
              (compUsages) => compUsages[index]?.value || 'N/A',
            ),
          );
          exportData.data.push(record);
        }
      });

      if (!exportData.data.length) {
        showError(translate('Chart is empty'));
        return;
      }

      exportAs(
        format,
        translate('Usage history') + ' - ' + props.resource.name,
        exportData,
      );
    },
    [props],
  );
};

export const UsageExportDropdown = (props: UsageExportDropdownProps) => {
  const exportUsages = useUsageExport(props);

  return (
    <DropdownButton
      variant="outline btn-outline-default"
      title={translate('Export all')}
    >
      <ActionItem
        title={translate('PNG')}
        action={() => exportUsages('png')}
        iconNode={<FilePng weight="bold" />}
      />
      <ActionItem
        title={translate('PDF')}
        action={() => exportUsages('pdf')}
        iconNode={<Printer weight="bold" />}
      />
      <ActionItem
        title={translate('CSV')}
        action={() => exportUsages('csv')}
        iconNode={<FileCsv weight="bold" />}
      />
      <ActionItem
        title={translate('Excel')}
        action={() => exportUsages('excel')}
        iconNode={<FileXls weight="bold" />}
      />
    </DropdownButton>
  );
};
