import { set, unset } from 'lodash-es';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SubmissionError } from 'redux-form';
import {
  marketplaceProviderOfferingsUpdateIntegration,
  OfferingIntegrationUpdateRequest,
  ProviderOfferingDetails,
} from 'waldur-js-client';

import { flattenObject } from '@waldur/core/utils';
import { translate } from '@waldur/i18n';
import { closeModalDialog } from '@waldur/modal/actions';
import { showError, showSuccess } from '@waldur/store/notify';

export const SCRIPT_ROWS = [
  { label: translate('Script language'), type: 'language' },
  {
    label: translate('Script for creation of a resource'),
    type: 'create',
    dry_run: 'Create',
  },
  {
    label: translate('Script for termination of a resource'),
    type: 'terminate',
    dry_run: 'Terminate',
  },
  {
    label: translate('Script for updating a resource on plan or limit change'),
    type: 'update',
    dry_run: 'Update',
  },
  {
    label: translate(
      'Script for regular update of resource and its accounting',
    ),
    type: 'pull',
    dry_run: 'Pull',
  },
];

export const useUpdateOfferingIntegration = (
  offering: ProviderOfferingDetails,
  refetch?,
) => {
  const dispatch = useDispatch();
  const update = useCallback(
    async (formData: OfferingIntegrationUpdateRequest) => {
      const payload = {
        service_attributes: offering.service_attributes,
        secret_options: offering.secret_options,
        plugin_options: offering.plugin_options,
        backend_id: offering.backend_id,
      };
      // Replace edited field(s)
      const flattenKeys = flattenObject(formData);
      Object.entries(flattenKeys).map(([key, value]) => {
        if (Array.isArray(value) && value.length === 0) {
          unset(payload, key);
        } else if (value || [0, false].includes(value)) {
          set(payload, key, value);
        } else {
          unset(payload, key);
        }
      });
      try {
        await marketplaceProviderOfferingsUpdateIntegration({
          path: { uuid: offering.uuid },
          body: payload,
        });
        dispatch(
          showSuccess(translate('Offering has been updated successfully.')),
        );
        if (refetch) await refetch();
        dispatch(closeModalDialog());
      } catch (error) {
        dispatch(showError(translate('Unable to update offering.')));
        throw new SubmissionError(error);
      }
    },
    [dispatch, offering, refetch],
  );

  return { update };
};
