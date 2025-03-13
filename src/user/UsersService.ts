import Axios from 'axios';
import { User } from 'waldur-js-client';

import { ENV } from '@waldur/configs/default';
import { get } from '@waldur/core/api';
import store from '@waldur/store/store';
import { setCurrentUser } from '@waldur/workspace/actions';
import { getUser } from '@waldur/workspace/selectors';
import {
  setImpersonatedUserUuid,
  clearImpersonatedUserUuid,
} from '@waldur/workspace/WorkspaceStorage';

export const getCurrentUser = (config?) =>
  get<User>('/users/me/', config).then((response) => response.data);

export const setImpersonationData = (userUuid) => {
  Axios.defaults.headers['X-IMPERSONATED-USER-UUID'] = userUuid;
  setImpersonatedUserUuid(userUuid);
};

export const clearImpersonationData = () => {
  delete Axios.defaults.headers['X-IMPERSONATED-USER-UUID'];
  clearImpersonatedUserUuid();
};

class UsersServiceClass {
  getCurrentUser(refetch = false) {
    const cached = this.getCachedUser();
    if (!refetch && cached) {
      return Promise.resolve(cached);
    }
    return getCurrentUser().then((user) => {
      const isImpersonated = Boolean(
        Axios.defaults.headers['X-IMPERSONATED-USER-UUID'],
      );
      store.dispatch(setCurrentUser(user, isImpersonated));
      return user;
    });
  }

  getCachedUser() {
    return getUser(store.getState());
  }

  isCurrentUserValid() {
    return this.getCurrentUser().then((user) => {
      return (
        user.is_staff ||
        (!this.mandatoryFieldsMissing(user) && (user as User).agreement_date)
      );
    });
  }

  mandatoryFieldsMissing(user) {
    return ENV.plugins.WALDUR_CORE.USER_MANDATORY_FIELDS.reduce(
      (result, item) => result || !user[item],
      false,
    );
  }
}

export const UsersService = new UsersServiceClass();
