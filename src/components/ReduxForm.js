import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { TextField, Button, Spinner } from './index.js';
import theme from '../styles/theme';

const renderField = ({ input, type, label, meta: { touched, error, warning }, fieldConfig }) => {
  let hasError = false;
  if (error !== undefined) {
    hasError = true;
  }
  if (fieldConfig.type === 'TextField') {
    return (
      <View>
        <TextField
          {...input}
          placeholder={fieldConfig.placeholder}
          secureTextEntry={fieldConfig.secureTextEntry}
          autoCapitalize={fieldConfig.autoCapitalize}
          autoCorrect={false}
          style={theme.input}
        />
        {touched && hasError ? <Text style={theme.errorTextStyle}>{error}</Text> : <Text />}
      </View>
    );
  }
};

const renderItem = (fieldConfig, field) => {
  return (
    <Field
      key={field}
      name={field}
      component={renderField}
      fieldConfig={fieldConfig}
      validate={fieldConfig.validate}
    />
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

const Form = props => {
  const { handleSubmit, fields, submitName, submitError, loading } = props;
  return (
    <KeyboardAvoidingView style={theme.container} behavior="padding" enabled>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        {_.map(fields, renderItem)}
        {renderError(submitError)}
        {renderButton(handleSubmit, submitName, loading)}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const ReduxForm = reduxForm({
  form: 'reduxForm'
})(Form);
