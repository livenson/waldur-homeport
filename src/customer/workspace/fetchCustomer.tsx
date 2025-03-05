import { Transition } from '@uirouter/react';

import { customerCreditsList } from '@waldur/api';
import { getCustomer } from '@waldur/customer/api';
import { router } from '@waldur/router';
import store from '@waldur/store/store';
import { setCurrentCustomer } from '@waldur/workspace/actions';

export async function fetchCustomer(transition: Transition) {
  const customerId = transition.params()?.uuid;
  if (!customerId) {
    router.stateService.go('errorPage.notFound');
  } else {
    try {
      const currentCustomer = await getCustomer(customerId);
      const credit = await customerCreditsList({
        query: { customer_uuid: currentCustomer?.uuid },
      }).then((r) => r.data[0]);
      Object.assign(currentCustomer, { credit });
      store.dispatch(setCurrentCustomer(currentCustomer));
    } catch {
      router.stateService.go('errorPage.notFound');
    }
  }
}
