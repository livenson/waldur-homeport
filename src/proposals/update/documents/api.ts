import { sendForm } from '@waldur/core/api';

export const attachDocuments = (
  call,
  file,
  description,
  onUploadProgress: (progress: number) => void,
) =>
  sendForm(
    'POST',
    `${call.url}attach_documents/`,
    { documents: file, description },
    onUploadProgress,
  );
