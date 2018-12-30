import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { KeyboardAvoidingView, ScrollView, Text, View, Picker } from 'react-native';
import { TextField, Selectable, Button, Spinner, DateTimePicker } from '../../components/index.js';
import theme from '../../styles/theme.js';

const renderField = ({ input, type, label, meta: { touched, error, warning }, fieldConfig }) => {
  let hasError = false;
  if (error !== undefined) {
    hasError = true;
  }
  switch (fieldConfig.type) {
    case 'TextField': {
      return (
        <View>
          <TextField
            {...input}
            placeholder={fieldConfig.label}
            multiline={fieldConfig.multiline}
            secureTextEntry={fieldConfig.secureTextEntry}
            autoCapitalize={fieldConfig.autoCapitalize}
            autoCorrect={false}
            style={theme.input}
          />
          {touched && hasError ? <Text style={theme.errorTextStyle}>{error}</Text> : <Text />}
        </View>
      );
    }
    case 'Selectable': {
      return (
        <View>
          <Selectable {...input} label={fieldConfig.label} />
        </View>
      );
    }
    case 'Picker': {
      return (
        <View>
          <Text>{fieldConfig.label}</Text>>
          <Picker selectedValue={input.value} onValueChange={value => input.onChange(value)}>
            {renderPickerItems(fieldConfig.items)}
          </Picker>
        </View>
      );
    }
    case 'DateTimePicker': {
      return (
        <View>
          <DateTimePicker
            {...input}
            label={fieldConfig.label}
            minuteInterval={fieldConfig.minuteInterval}
          />
          {touched && hasError ? <Text style={theme.errorTextStyle}>{error}</Text> : <Text />}
        </View>
      );
    }
    default:
      return null;
  }
};

const renderItem = (fieldConfig, field) => {
  if (fieldConfig.type === 'Select') {
    return (
      <View key={field}>
        <Text>{fieldConfig.label}</Text>
        {_.map(fieldConfig.fields, (data, key) => {
          return (
            <Field
              key={key}
              name={key}
              type="checkbox"
              component={renderField}
              fieldConfig={data}
              validate={data.validate}
            />
          );
        })}
      </View>
    );
  }
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

const renderPickerItems = items => {
  return _.map(items, (value, key) => {
    return <Picker.Item key={key} label={value} value={key} />;
  });
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

const renderTitle = (title) => {
 if (title) return <Text style={title.style}>{title.label}</Text>;
};

const Form = props => {
  const {
    handleSubmit,
    title,
    fields,
    submitName,
    status: { submitError, loading }
  } = props;
  return (
    <KeyboardAvoidingView style={theme.container} behavior="padding" enabled>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        {renderTitle(title)}
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
