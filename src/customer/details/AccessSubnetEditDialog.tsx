import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import {
  accessSubnetsPartialUpdate,
  PatchedAccessSubnetRequest,
} from '@waldur/api';
import { translate } from '@waldur/i18n';
import { closeModalDialog } from '@waldur/modal/actions';
import { ModalDialog } from '@waldur/modal/ModalDialog';
import { showErrorResponse, showSuccess } from '@waldur/store/notify';

export const AccessSubnetEditDialog = ({ refetch, row }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<PatchedAccessSubnetRequest>({
    inet: row.inet,
    description: row.description,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await accessSubnetsPartialUpdate({
        path: { uuid: row.uuid },
        body: formData,
      });
      dispatch(showSuccess(translate('Access subnet has been updated.')));
      refetch();
      dispatch(closeModalDialog());
    } catch (error) {
      dispatch(
        showErrorResponse(error, translate('Unable to update access subnet.')),
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ModalDialog
        title={translate('Edit access subnet')}
        closeButton
        footer={
          <Button type="submit" variant="primary" size="sm">
            {translate('Update')}
          </Button>
        }
      >
        <Form.Group>
          <Form.Label>{translate('CIDR')}</Form.Label>
          <Form.Control
            type="text"
            name="inet"
            value={formData.inet}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{translate('Description')}</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Group>
      </ModalDialog>
    </Form>
  );
};
