import { useCurrentStateAndParams, useRouter } from '@uirouter/react';
import { Nav, Tab } from 'react-bootstrap';

import { TableProps } from './types';

type TableTabsProps = Pick<TableProps, 'tabs'>;

export const TableTabs = ({ tabs }: TableTabsProps) => {
  const { state } = useCurrentStateAndParams();
  const router = useRouter();
  const goTo = (state) => {
    const tab = tabs.find((t) => t.state === state);
    router.stateService.go(tab.state, tab.params);
  };

  return (
    <Tab.Container unmountOnExit={true} activeKey={state.name} onSelect={goTo}>
      <div className="overflow-autoo flex-grow-1 pb-2 pt-4">
        <Nav variant="tabs" className="nav-line-tabs flex-nowrap mx-0 border-0">
          {tabs.map((tab) => (
            <Nav.Item key={tab.key} className="text-nowrap">
              <Nav.Link as="button" eventKey={tab.state}>
                {tab.title}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </Tab.Container>
  );
};
