import React from 'react';
import Text from './Text';

export default function ErrorLine({ error }) {
  return error ? <Text color="red">{error.message}</Text> : null;
}
