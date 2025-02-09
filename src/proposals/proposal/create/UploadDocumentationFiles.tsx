import { ACCEPTED_FILE_TYPES } from '@waldur/core/constants';
import { DropzoneFiles } from '@waldur/core/DropzoneFiles';
import { formatJsx, translate } from '@waldur/i18n';

import { DocumentationFiles } from './DocumentationFiles';

export const UploadDocumentationFiles = (props) => (
  <>
    <DocumentationFiles files={props.proposal.supporting_documentation} />
    <DropzoneFiles
      multiple={true}
      maxSize={25 * 1024 * 1024} // 25MB
      accept={ACCEPTED_FILE_TYPES}
      onDrop={(files) => props.input.onChange(files)}
      message={translate(
        'Drag and drop file here or <u>Choose file</u>',
        {
          u: (s) => <u className="text-link">{s}</u>,
        },
        formatJsx,
      )}
      footerLeft={
        translate('Supported formats') + ': PDF, PNG/JPG/JPEG, DOC/DOCX/ODT'
      }
      footerRight={translate('Maximum size') + ': 25MB'}
    />
  </>
);
