import { setIn } from 'final-form';
import * as Yup from 'yup';

export { Yup };

export const formValidation = (schema) => async (values, context) => {
  let _schema = schema;
  if (typeof schema === 'function') {
    _schema = schema();
  }
  try {
    await _schema.validate(values, { abortEarly: false, context });
    return null;
  } catch (err) {
    const errors = err.inner.reduce((formError, innerError) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});

    return errors;
  }
};
