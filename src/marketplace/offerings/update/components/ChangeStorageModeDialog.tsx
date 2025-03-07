import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';

import {
  marketplaceProviderOfferingsUpdateIntegration,
  MergedPluginOptionsRequest,
  StorageModeEnum,
} from '@waldur/api';
import { translate } from '@waldur/i18n';
import { Option } from '@waldur/marketplace/common/registry';
import { useModal } from '@waldur/modal/hooks';
import { useNotify } from '@waldur/store/hooks';

interface ChangeStorageModeDialogProps {
  resolve: {
    offering: { plugin_options: MergedPluginOptionsRequest; uuid: string };
    refetch(): void;
    currentMode: StorageModeEnum;
    modes: Option[];
  };
}

export const ChangeStorageModeDialog: FC<ChangeStorageModeDialogProps> = (
  props,
) => {
  const { showSuccess, showErrorResponse } = useNotify();
  const { closeDialog } = useModal();

  return (
    <Form<{ storage_mode: StorageModeEnum }>
      onSubmit={async (formData) => {
        try {
          await marketplaceProviderOfferingsUpdateIntegration({
            path: { uuid: props.resolve.offering.uuid },
            body: {
              plugin_options: {
                ...props.resolve.offering.plugin_options,
                storage_mode: formData.storage_mode,
              },
            },
          });
          showSuccess(translate('Storage mode has been updated.'));
          closeDialog();
          props.resolve.refetch();
        } catch (error) {
          showErrorResponse(error, translate('Unable to update storage mode.'));
        }
      }}
      initialValues={{ storage_mode: props.resolve.currentMode }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>{translate('Change storage mode')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Field name="storage_mode">
              {({ input }) => (
                <select {...input} className="form-control">
                  {props.resolve.modes.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
              )}
            </Field>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => closeDialog()}>
              {translate('Cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {translate('Save')}
            </Button>
          </Modal.Footer>
        </form>
      )}
    />
  );
};
