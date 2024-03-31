import React from 'react';

import UserFeedbackForm from '../user-feedback-form/UserFeedbackForm';

function NewsLetter({ validate, formFields, ...rest }) {
  return <UserFeedbackForm validate={validate} formFields={formFields} {...rest} />;
}

export default NewsLetter;
