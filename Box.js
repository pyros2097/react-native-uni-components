import React from 'react';
import { View, TouchableOpacity } from 'react-native';

export default function Box({ key, ref, children, ...props }) {
  return (
    <View key={key} ref={ref} style={props}>
      {children}
    </View>
  );
}

export function Touch({ testID, key, ref, disabled, onPress, children, ...props }) {
  return (
    <TouchableOpacity testID={testID} key={key} ref={ref} disabled={disabled} onPress={onPress} style={props}>
      {children}
    </TouchableOpacity>
  );
}
