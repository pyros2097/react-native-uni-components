import React from 'react';
import { Touch } from './Box';
import Spinner from './Spinner';
import Text from './Text';
import { useTheme } from './hooks';

export default function Button({ title, loading = false, disabled = false, width = 300, borderRadius = 25, onPress }) {
  const { buttonText, buttonBackground, buttonBackgroundDisabled } = useTheme();
  return (
    <Touch
      alignItems="center"
      justifyContent="center"
      height={50}
      width={width}
      borderRadius={borderRadius}
      backgroundColor={disabled ? buttonBackgroundDisabled : buttonBackground}
      disabled={disabled || loading}
      onPress={onPress}
    >
      {loading ? <Spinner /> : <Text color={buttonText}>{title}</Text>}
    </Touch>
  );
}
