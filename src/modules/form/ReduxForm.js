import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { KeyboardAvoidingView, ScrollView, Text, View, Picker } from 'react-native';
import {
  TextField,
  Selectable,
  CustomButton,
  Spinner,
  DateTimePicker
} from '../../components/index.js';
import theme, { margin } from '../../styles/theme';

const renderTitle = title => {
  if (title) return <Text style={title.style}>{title.label}</Text>;
};

const renderFields = children => {
  return React.Children.map(children, child => {
    return (
      <Field
        name={child.props.name}
				type={child.props.type}
        child={child}
        component={renderItem}
        validate={child.props.validate}
      />
    );
  });
};

const renderItem = ({ input, meta: { touched, error, warning }, child }) => {
  return (
    <View style={{ marginVertical: margin.sm }}>
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
  return <CustomButton onPress={handleSubmit}>{submitName}</CustomButton>;
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
        {renderFields(props.children)}
        {renderError(submitError)}
        {/* TODO: fix rendering spinner and layout */}
        {renderButton(handleSubmit, submitName, loading)}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const ReduxForm = reduxForm({
  form: 'reduxForm'
})(Form);
