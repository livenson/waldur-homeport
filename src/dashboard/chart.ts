import { EChartsOption } from 'echarts';

import { ENV } from '@waldur/core/config';
import { DEFAULT_PRIMARY_COLORS } from '@waldur/core/constants';
import { generateBrandColors } from '@waldur/core/generateColors';
import { ThemeName } from '@waldur/theme/types';

import { LINE_CHART_COLOR } from './constants';
import { Chart, RingChartOption } from './types';

type Value = string | number;
interface HLine {
  label: string;
  value: number;
}

export const getScopeChartOptions = (
  dates: string[],
  values: Value[],
  hLines?: HLine[],
  color?: string,
): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    formatter: '{b}',
  },
  grid: {
    left: 10,
    top: 10,
    right: 10,
    bottom: 10,
    containLabel: false,
  },
  xAxis: {
    data: dates,
    show: false,
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      type: 'line',
      data: values,
      color,
      markLine: !hLines?.length
        ? undefined
        : {
            data: hLines.map((line) => [
              {
                label: {
                  show: false,
                  position:
                    line.value > Math.max(...values.map((v) => Number(v)))
                      ? 'insideMiddleBottom'
                      : 'insideMiddleTop',
                  formatter: line.label,
                },
                emphasis: { label: { show: true } },
                lineStyle: { type: 'solid', color: '#0072ff' },
                yAxis: line.value,
                x: '0%',
                symbol: 'none',
              },
              {
                yAxis: line.value,
                x: '100%',
                symbol: 'none',
              },
            ]),
          },
    },
  ],
});

const getScopeChartOptionsWithAxis = ({
  dates,
  values,
  color,
  xAxisValues,
  xAxisLabel,
  yAxisLabel,
}: {
  dates: string[];
  values: Value[];
  color?: string;
  xAxisValues?: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}) => ({
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      return dates[params.dataIndex];
    },
    axisPointer: {
      animation: false,
    },
  },
  grid: {
    left: 45,
    top: 10,
    right: 0,
    bottom: 30,
    containLabel: false,
  },
  xAxis: {
    data: xAxisValues || dates,
    show: true,
    name: xAxisLabel,
    splitLine: { show: false },
    axisLine: { show: false, onZero: false },
    axisTick: { show: false },
  },
  yAxis: {
    show: true,
    name: yAxisLabel,
    nameLocation: 'center',
    nameGap: 30,
    splitLine: { lineStyle: { color: '#f5f8fa' } },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  series: [
    {
      type: 'line',
      data: values,
      color,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: color + '44', // color at 0% position
            },
            {
              offset: 1,
              color: color + '00', // color at 100% position - add '00' at the end of color hex for a 0 opacity
            },
          ],
          global: false, // false by default
        },
      },
    },
  ],
});

export const getLineChartOptions = (chart: Chart, hLines?: HLine[]) =>
  getScopeChartOptions(
    chart.data.map((item) => item.label),
    chart.data.map((item) => item.value),
    hLines,
    LINE_CHART_COLOR,
  );

export const getLineChartOptionsWithAxis = (chart: Chart) =>
  getScopeChartOptionsWithAxis({
    dates: chart.data.map((item) => item.label),
    values: chart.data.map((item) => item.value),
    color: LINE_CHART_COLOR,
    xAxisValues: chart.data.map((item) => item.xAxisValue),
    yAxisLabel: chart.yAxisLabel,
  });

export const getRingChartOptions = (
  props: RingChartOption,
  theme: ThemeName,
): EChartsOption => {
  const emptySpace = (props.max || 100) - props.value;
  const brand =
    ENV.plugins.WALDUR_CORE.BRAND_COLOR || DEFAULT_PRIMARY_COLORS[600];
  const brandColors = generateBrandColors(brand);
  return {
    tooltip: {
      trigger: 'item',
      position: 'top',
      formatter: function (params) {
        return params.dataIndex === 0 ? props.tooltip : null;
      },
    },
    title: {
      text: props.title,
      left: 'center',
      top: '26%',
      textStyle: {
        color: theme === 'light' ? '#667085' : '#98a2b3',
        fontSize: 12,
        fontWeight: 500,
      },
    },
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    color:
      theme === 'light'
        ? [brand, brandColors[100]]
        : [brandColors[200], brandColors[950]],
    series: [
      {
        type: 'pie',
        startAngle: 90,
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          offset: [0, 15, 0, 0],
          color: theme === 'light' ? '#101828' : '#f9fafb',
          fontSize: 14,
          fontWeight: 600,
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          label: {
            fontSize: 15,
          },
          scaleSize: 2,
        },
        data: [
          {
            value: props.value,
            name: props.label,
          },
          {
            value: emptySpace,
            label: { show: false },
            itemStyle: {
              color: theme === 'light' ? brandColors[100] : brandColors[900],
            },
            emphasis: {
              itemStyle: {
                color: theme === 'light' ? brandColors[100] : brandColors[900],
              },
            },
          },
        ],
        radius: ['83%', '98%'],
      },
    ],
  };
};
