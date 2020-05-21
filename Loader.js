import React from 'react';
import { View } from 'react-native';
import Spinner from './Spinner';

export default () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Spinner />
  </View>
);
