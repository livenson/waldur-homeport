import { DateTime } from 'luxon';
import { FunctionComponent, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { ComponentUserUsage, OfferingComponent } from 'waldur-js-client';

import { translate } from '@waldur/i18n';

import { ComponentUsage } from './types';
import {
  getFormattedUsages,
  getTotalUsagePeriod,
  getUsagePeriods,
} from './utils';

interface ResourceUsageTableProps {
  offeringComponent: OfferingComponent;
  usages: ComponentUsage[];
  userUsages?: ComponentUserUsage[];
}

interface TableData {
  username?: string;
  date: string;
  usage: number;
}

export const ResourceUsageTable: FunctionComponent<ResourceUsageTableProps> = ({
  offeringComponent,
  usages,
  userUsages,
}) => {
  const hasUserStats = Boolean(userUsages?.length);

  const rows = useMemo<TableData[]>(() => {
    const { labels, periods } = getUsagePeriods(usages);
    const componentUsages = getFormattedUsages(
      periods,
      usages.filter((usage) => usage.type === offeringComponent.type),
      userUsages?.filter(
        (usage) => usage.component_type === offeringComponent.type,
      ),
    );

    const _rows = [];

    labels.forEach((label, monthIndex) => {
      const monthUsages = componentUsages[monthIndex];
      const hasUsage = Number(monthUsages?.value);
      if (hasUsage) {
        const [month, year] = label.split(' - ').map((x) => Number(x));
        const dateString = DateTime.fromObject({ year, month }).toFormat(
          'MM/yyyy',
        );
        if (hasUserStats) {
          if (monthUsages.details?.length) {
            monthUsages.details.forEach((userUsage) => {
              const userRecord = {
                username: userUsage.username,
                date: dateString,
                usage: userUsage.usage || '0',
              };
              _rows.push(userRecord);
            });
          }
        }

        // Add Total of month
        const record = {
          username: translate('Total of {label}', { label: dateString }),
          date: dateString,
          usage: hasUsage,
        };
        _rows.push(record);
      }
    });

    return _rows;
  }, [offeringComponent, usages, userUsages]);

  const total = useMemo(
    () =>
      Number(
        usages
          .filter((record) => record.type === offeringComponent.type)
          .reduce((acc, record) => acc + Number(record.usage), 0),
      ),
    [usages, offeringComponent],
  );

  const totalPeriod = useMemo(
    () => getTotalUsagePeriod(usages, offeringComponent),
    [offeringComponent, usages],
  );

  return (
    <Table className="align-middle mt-4 mb-0">
      <thead>
        <tr className="bg-gray-50">
          {hasUserStats && <th>{translate('Username')}</th>}
          <th className="w-50">{translate('Date')}</th>
          <th>
            {offeringComponent.name + '/' + offeringComponent.measured_unit}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((item, i) => (
          <tr key={i} className="border-top">
            {hasUserStats && <td>{item.username}</td>}
            <td>{item.date}</td>
            <td>{item.usage}</td>
          </tr>
        ))}
        <tr className="border-top">
          {hasUserStats ? (
            <>
              <th>{translate('Total')}</th>
              <td>{totalPeriod}</td>
            </>
          ) : (
            <th>
              {translate('Total')}
              {rows.length > 0 && (
                <small className="ms-1 text-muted fw-normal">
                  ({totalPeriod})
                </small>
              )}
            </th>
          )}
          <td>{total}</td>
        </tr>
      </tbody>
    </Table>
  );
};
