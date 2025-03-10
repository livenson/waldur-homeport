import FormTable from '@waldur/form/FormTable';
import { translate } from '@waldur/i18n';

import { ConfigurationEditButton } from './ConfigurationEditButton';
import { getKeyTitle } from './utils';

const ColorField = ({ value }) => (
  <div className="symbol symbol-50px symbol-circle">
    <div
      className="symbol-label"
      style={{
        backgroundColor: value,
      }}
    />
  </div>
);
const ImageField = ({ value }) => (
  <div className="symbol symbol-50px symbol-circle">
    <div
      className="symbol-label"
      style={{
        backgroundImage: `url(${value})`,
      }}
    />
  </div>
);

export const FieldRow = ({ item, value }) => {
  return (
    <FormTable.Item
      key={item.key}
      label={getKeyTitle(item.key)}
      description={item.description}
      descriptionClassName="text-gray-600"
      value={
        item.type === 'image_field' ? (
          <ImageField value={value} />
        ) : item.type === 'color_field' ? (
          <ColorField value={value} />
        ) : item.type === 'boolean' ? (
          value === true ? (
            translate('Yes')
          ) : (
            translate('No')
          )
        ) : typeof value === 'object' ? (
          <pre>{JSON.stringify(value, null, 2)}</pre>
        ) : (
          value
        )
      }
      actions={<ConfigurationEditButton item={item} value={value} />}
    />
  );
};
