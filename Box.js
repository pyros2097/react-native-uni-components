import React from 'react';
import { View, TouchableOpacity } from 'react-native';

export default function Box({ children, ...props }) {
  return <View style={props}>{children}</View>;
}

export function Touch({ disabled, onPress, children, ...props }) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={props}>
      {children}
    </TouchableOpacity>
  );
}
