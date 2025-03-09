import { Transition } from '@uirouter/react';

import { projectsRetrieve } from '@waldur/api';
import { Project } from '@waldur/api';
import { router } from '@waldur/router';
import store from '@waldur/store/store';
import {
  setCurrentCustomer,
  setCurrentProject,
} from '@waldur/workspace/actions';

import { getCustomer } from '../customer/api';

export function loadProject(transition: Transition) {
  if (!transition.params().uuid) {
    return router.stateService.go('errorPage.notFound');
  }

  async function loadData() {
    try {
      const project = await projectsRetrieve({
        path: { uuid: transition.params().uuid },
      });
      const customer = await getCustomer(project.data.customer_uuid);
      store.dispatch(setCurrentCustomer(customer));
      store.dispatch(setCurrentProject(project.data as unknown as Project));
    } catch (error) {
      if (error.response?.status === 404) {
        router.stateService.go('errorPage.notFound');
      }
    }
  }
  return loadData();
}
