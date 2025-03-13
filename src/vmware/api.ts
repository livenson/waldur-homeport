import {
  vmwareClustersList,
  vmwareDatastoresList,
  vmwareFoldersList,
  vmwareTemplatesList,
} from 'waldur-js-client';

import { getAllPages } from '@waldur/core/api';

export const getVMwareTemplates = (settings_uuid: string) =>
  getAllPages((page) =>
    vmwareTemplatesList({
      query: { page, settings_uuid },
    }),
  );

export const loadVMwareAdvancedOptions = async (props: {
  settings_uuid: string;
  customer_uuid: string;
}) => {
  const [clusters, datastores, folders] = await Promise.all([
    getAllPages((page) =>
      vmwareClustersList({
        query: {
          page,
          settings_uuid: props.settings_uuid,
          customer_uuid: props.customer_uuid,
        },
      }),
    ),
    getAllPages((page) =>
      vmwareDatastoresList({
        query: {
          page,
          settings_uuid: props.settings_uuid,
          customer_uuid: props.customer_uuid,
        },
      }),
    ),
    getAllPages((page) =>
      vmwareFoldersList({
        query: {
          page,
          settings_uuid: props.settings_uuid,
          customer_uuid: props.customer_uuid,
        },
      }),
    ),
  ]);
  return {
    clusters,
    datastores,
    folders,
  };
};
