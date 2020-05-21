import React, { Suspense, useState } from 'react';
import { Keyboard } from 'react-native';
import { useForm as useHookForm } from 'react-hook-form';
import * as yup from 'yup';
import App from './App';
import Box from './Box';
import Text from './Text';
import TextInput from './TextInput';
import Spinner from './Spinner';
import ErrorLine from './ErrorLine';
import Button from './Button';
import Image from './Image';
import Theme from './Theme';
import Loader from './Loader';
import ErrorBoundary from './ErrorBoundary';
import Sentry from './sentry';

// TODO: something like Platform.select by desktop/mobile

const useForm = ({ initial, schema, getErrorMsg, onSubmit }) => {
  const [error, setError] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const { control, handleSubmit, errors, reset, triggerValidation } = useHookForm({
    defaultValues: initial,
    validationSchema: yup.object().shape(schema(yup)),
  });
  return {
    control: control,
    isSubmitting: isSubmitting,
    error: error,
    errors: errors,
    onSubmit: async (e) => {
      setError(null);
      setSubmitting(true);
      try {
        await triggerValidation();
        if (Object.keys(errors).length > 0) {
          return;
        }
        await handleSubmit(onSubmit)(e);
        Keyboard.dismiss();
        reset();
      } catch (err) {
        const msg = getErrorMsg(err);
        if (msg === '') {
          Sentry.captureException(error);
          setError('Oops something went wrong');
        } else {
          setError(msg);
        }
      } finally {
        setSubmitting(false);
      }
    },
  };
};

const screen = (Comp, loaderComp = null, errorComp = null) => (props) => (
  <ErrorBoundary fallback={errorComp} {...props}>
    <Suspense fallback={loaderComp || Loader}>
      <Comp {...props} />
    </Suspense>
  </ErrorBoundary>
);

export { App, Box, Text, TextInput, Spinner, ErrorLine, Button, Image, Theme, ErrorBoundary, Sentry, screen, useForm };
