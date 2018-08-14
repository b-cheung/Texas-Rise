import { createSelector } from 'reselect';

export const getSubmitError = state => state.form.reduxForm.submitError;
export const getLoading = state => state.form.reduxForm.loading;

export const getFormStatus = createSelector(getSubmitError, getLoading, (submitError, loading) => {
  return { submitError, loading };
});
