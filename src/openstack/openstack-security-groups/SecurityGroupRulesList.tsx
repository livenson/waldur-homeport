import { OpenStackSecurityGroup } from 'waldur-js-client';

import { ExpandableContainer } from '@waldur/table/ExpandableContainer';

import { SecurityGroupRuleCell } from './SecurityGroupRuleCell';
import { SecurityGroupRuleHeader } from './SecurityGroupRuleHeader';

export const SecurityGroupRulesList = ({
  row,
}: {
  row: OpenStackSecurityGroup;
}) => (
  <ExpandableContainer>
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <SecurityGroupRuleHeader />
          </tr>
        </thead>
        <tbody>
          {row.rules.map((rule, index) => (
            <tr key={index}>
              <SecurityGroupRuleCell rule={rule} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </ExpandableContainer>
);
