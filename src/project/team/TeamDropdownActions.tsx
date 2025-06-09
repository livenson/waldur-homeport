import { CaretDownIcon, PlusCircleIcon } from '@phosphor-icons/react';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Project } from 'waldur-js-client';

import { ServiceAccountCreateButton } from '@waldur/customer/service-accounts/ServiceAccountCreateAction';
import { translate } from '@waldur/i18n';
import { InvitationCreateButton } from '@waldur/invitations/actions/create/InvitationCreateButton';
import { getTableState } from '@waldur/table/selectors';

import { AddUserButton } from './AddUserButton';

interface TeamDropdownActionsProps {
  project: Project;
  refetch?(): void;
}

export const TeamDropdownActions = ({
  project,
  refetch,
}: TeamDropdownActionsProps) => {
  const tableState = useSelector(
    getTableState('marketplace-project-service-accounts'),
  );
  const isServiceAccountLimitReached =
    project.max_service_accounts > 0 &&
    tableState?.pagination?.resultCount >= project.max_service_accounts;

  return (
    <Dropdown placement="bottom-end">
      <Dropdown.Toggle variant="primary" className="no-arrow btn-icon-right">
        <span className="svg-icon svg-icon-2">
          <PlusCircleIcon weight="bold" />
        </span>
        {translate('Add')}
        <span className="svg-icon svg-icon-2 rotate-180">
          <CaretDownIcon weight="bold" />
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu flip>
        <InvitationCreateButton
          project={project}
          roleTypes={['project']}
          refetch={refetch}
          enableBulkUpload={true}
        />

        <AddUserButton project={project} refetch={refetch} />
        {project.max_service_accounts !== 0 && (
          <ServiceAccountCreateButton
            context="project"
            scope={project}
            refetch={refetch}
            disabled={isServiceAccountLimitReached}
          />
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
