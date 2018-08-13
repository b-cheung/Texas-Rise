export const required = value => (value ? undefined : 'Required');
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const schoolEmail = value =>
  value && !(/.+@utexas\.edu/.test(value) || /.+@stu\.austinisd\.org/.test(value))
    ? 'Must use school email (utexas.edu or stu.austinisd.org)'
    : undefined;
export const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

// export const email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? 'Invalid email address'
//     : undefined;
// const maxLength = max => value =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined;
// const maxLength15 = maxLength(15);
// const minValue = min => value => (value && value < min ? `Must be at least ${min}` : undefined);
// const minValue18 = minValue(18);
