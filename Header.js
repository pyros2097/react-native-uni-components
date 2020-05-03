import React from 'react';
import { Platform } from 'react-native';
import Box, { Touch } from './Box';
import Text from './Text';
import Image from './Image';

export default (navigation) => {
  const options = {
    headerTitle: (props) => {
      return (
        <Touch flexDirection="row" alignItems="center" onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/logo.jpg')} style={{ height: 48, width: 48 }} />
          <Text>Dwelsmart</Text>
        </Touch>
      );
    },
    headerTitleAlign: 'center',
  };
  if (Platform.OS === 'web') {
    options['headerLeft'] = () => null;
  }
  return options;
};
