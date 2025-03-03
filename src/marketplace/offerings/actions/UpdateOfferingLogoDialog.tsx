import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';

import { marketplaceProviderOfferingsUpdateThumbnail } from '@waldur/api';
import { formDataOptions } from '@waldur/core/api';
import { FormContainer, SubmitButton } from '@waldur/form';
import { translate } from '@waldur/i18n';
import { UPDATE_OFFERING_LOGO_FORM_ID } from '@waldur/marketplace/offerings/actions/constants';
import { ImageUploadField } from '@waldur/marketplace/offerings/update/ImageUploadField';
import { closeModalDialog } from '@waldur/modal/actions';
import { CloseDialogButton } from '@waldur/modal/CloseDialogButton';
import { ModalDialog } from '@waldur/modal/ModalDialog';
import { showErrorResponse, showSuccess } from '@waldur/store/notify';

const PureUpdateOfferingLogoDialog: FunctionComponent<any> = (props) => {
  const dispatch = useDispatch();
  const submitRequest = async (formData) => {
    try {
      await marketplaceProviderOfferingsUpdateThumbnail({
        path: { uuid: props.resolve.offering.uuid },
        body: {
          thumbnail: formData.images,
        },
        ...formDataOptions,
      });
      dispatch(showSuccess(translate('Logo has been updated successfully.')));
      props.resolve.refetch();
      dispatch(closeModalDialog());
    } catch (error) {
      dispatch(showErrorResponse(error, translate('Unable to update logo.')));
    }
  };
  return (
    <form onSubmit={props.handleSubmit(submitRequest)}>
      <ModalDialog
        title={translate('Update image')}
        footer={
          <>
            <CloseDialogButton />
            <SubmitButton
              submitting={props.submitting}
              label={translate('Save')}
            />
          </>
        }
      >
        {props.resolve.offering.thumbnail && (
          <img
            src={props.resolve.offering.thumbnail}
            alt={translate('Logo here')}
          />
        )}
        <FormContainer submitting={props.submitting}>
          <ImageUploadField
            name="images"
            label={translate('Image: ')}
            accept={'image/*'}
            buttonLabel={translate('Browse')}
            className="btn btn-secondary"
            required={true}
          />
        </FormContainer>
      </ModalDialog>
    </form>
  );
};

const enhance = reduxForm({
  form: UPDATE_OFFERING_LOGO_FORM_ID,
});

export const UpdateOfferingLogoDialog = enhance(PureUpdateOfferingLogoDialog);
