import React from 'react';

import { Form, Field } from 'react-final-form';

import { Box, Button, CircularProgress, Stack } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function UserFeedbackForm({ validate, formFields, initialValues = {}, onSubmitForm, isButtonFullwidth = false, buttonName, pending = false }) {
  return (
    <Box>
      <Form
        onSubmit={onSubmitForm}
        validate={validate}
        initialValues={initialValues}
        render={({ handleSubmit, submitting, hasValidationErrors }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {React.Children.toArray(
                formFields?.map(({ component, id, label, placeholder, disabled = false, ...rest }) => (
                  <Field name={id} key={id} id={id} label={label} component={component} placeholder={placeholder} disabled={disabled} {...rest} />
                ))
              )}
              <Box sx={{ width: '100%' }}>
                <Button type="submit" variant="contained" color="secondary" disabled={hasValidationErrors || submitting} fullWidth={isButtonFullwidth} sx={{ minWidth: 180 }}>
                  {submitting || pending ? <CircularProgress color="inherit" size={22} /> : <Typography text={buttonName} variant="button" color="secondary.contrastText" />}
                </Button>
              </Box>
            </Stack>
          </form>
        )}
      />
    </Box>
  );
}

export default UserFeedbackForm;
