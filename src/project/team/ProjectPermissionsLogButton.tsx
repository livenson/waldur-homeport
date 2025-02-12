import { useSelector } from 'react-redux';

import { FilteredEventsButton } from '@waldur/events/FilteredEventsButton';
import { getProject } from '@waldur/workspace/selectors';

export const ProjectPermissionsLogButton = () => {
  const project = useSelector(getProject);
  return (
    <FilteredEventsButton
      filter={{
        scope: project.url,
        event_type: ['role_granted', 'role_revoked', 'role_updated'],
      }}
    />
  );
};
