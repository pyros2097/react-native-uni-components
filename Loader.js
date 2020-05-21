import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default ({ size = 32, color = 'black' }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size={size} color={color} />
  </View>
);
