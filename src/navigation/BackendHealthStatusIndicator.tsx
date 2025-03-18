import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAsync } from 'react-use';
import { client } from 'waldur-js-client/client.gen';

import { ENV } from '@waldur/core/config';
import { lazyComponent } from '@waldur/core/lazyComponent';
import { openModalDialog } from '@waldur/modal/actions';

const BackendHealthStatusDialog = lazyComponent(() =>
  import('./BackendHealthStatusDialog').then((module) => ({
    default: module.BackendHealthStatusDialog,
  })),
);

export const getBackendHealthStatus = async () => {
  const response = await client.get({
    baseUrl: ENV.apiEndpoint,
    url: '/health-check/',
    headers: {
      Accept: 'application/json',
    },
    throwOnError: false,
  });
  return (response.data || response.error) as Record<string, string>;
};

export const isWorking = (data: Record<string, string>): boolean => {
  if (!data) return false;
  return Object.values(data).every((item) => item === 'working');
};

export const BackendHealthStatusIndicator: FC = () => {
  const dispatch = useDispatch();
  const { value } = useAsync(getBackendHealthStatus, []);

  if (!value) return null;

  return (
    <span className="me-2">
      <button
        type="button"
        className="text-btn"
        onClick={() =>
          dispatch(openModalDialog(BackendHealthStatusDialog, { size: 'lg' }))
        }
      >
        {isWorking(value) ? (
          <CheckCircle size={20} className="text-success" />
        ) : (
          <XCircle size={20} className="text-danger" />
        )}
      </button>
    </span>
  );
};
