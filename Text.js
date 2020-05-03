import React from 'react';
import { Text as RNText } from 'react-native';

export default function Text({ testID = '', children, ...props }) {
  return (
    <RNText testID={testID} style={{ fontSize: 16, color: '#333333', ...props }}>
      {children}
    </RNText>
  );
}
