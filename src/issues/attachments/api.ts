import { ENV } from '@waldur/configs/default';
import { sendForm } from '@waldur/core/api';

export const putAttachment = (
  issueUrl: string,
  file: File,
  onUploadProgress?: (progress: number) => void,
) => {
  return sendForm(
    'POST',
    `${ENV.apiEndpoint}api/support-attachments/`,
    { issue: issueUrl, file },
    onUploadProgress,
  );
};
