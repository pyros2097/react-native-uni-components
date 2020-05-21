import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function Spinner({ size = 32, color = 'black' }) {
  return <ActivityIndicator size={size} color={color} />;
}
