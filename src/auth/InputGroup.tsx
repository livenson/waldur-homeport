import { useCallback, FunctionComponent } from 'react';
import { Field, WrappedFieldInputProps } from 'redux-form';

interface InputGroupProps {
  fieldName: string;
  placeholder: string;
  type: 'text' | 'password' | 'email'; // Limit to common input types
}

interface RenderInputProps {
  input: WrappedFieldInputProps;
}

export const InputGroup: FunctionComponent<InputGroupProps> = ({
  fieldName,
  placeholder,
  type,
}) => {
  const renderComponent = useCallback(
    ({ input }: RenderInputProps) => (
      <input
        className="login-input"
        type={type}
        placeholder={placeholder}
        {...input}
      />
    ),
    [placeholder, type],
  );

  return <Field name={fieldName} component={renderComponent} />;
};
