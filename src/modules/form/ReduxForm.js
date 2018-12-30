import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { KeyboardAvoidingView, ScrollView, Text, View, Picker } from 'react-native';
import { TextField, Selectable, Button, Spinner, DateTimePicker } from '../../components/index.js';
import theme from '../../styles/theme.js';

const renderItem = ({ input, type, label, meta: { touched, error, warning }, child }) => {
  return (
    <View>
      {React.cloneElement(child, { ...input })}
      {touched && error && <Text style={theme.errorTextStyle}>{error}</Text>}
    </View>
  );
};

const renderError = submitError => {
  if (submitError) {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <Text style={theme.errorTextStyle}>{submitError}</Text>
      </View>
    );
  }
};

const renderButton = (handleSubmit, submitName, loading) => {
  if (loading) {
    return <Spinner size="large" />;
  }
  return <Button onPress={handleSubmit}>{submitName}</Button>;
};

const renderTitle = title => {
  if (title) return <Text style={title.style}>{title.label}</Text>;
};

const Form = props => {
  const {
    handleSubmit,
    title,
    submitName,
    status: { submitError, loading }
  } = props;
  return (
    <KeyboardAvoidingView style={theme.container} behavior="padding" enabled>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        {renderTitle(title)}
        {React.Children.map(props.children, child => {
          return (
            <Field
              name={child.props.name}
              child={child}
              component={renderItem}
              validate={child.props.validate}
            />
          );
        })}
        {renderError(submitError)}
        {renderButton(handleSubmit, submitName, loading)}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const ReduxForm = reduxForm({
  form: 'reduxForm'
})(Form);
