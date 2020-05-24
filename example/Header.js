import React from 'react';
import { Button } from 'react-native';
import { useLocal } from '@pyros2097/use-promise';
import { Box } from 'react-native-uni-components';

const Header = () => {
  const [shown, setShown] = useLocal('navigationShown');
  return (
    <Box flexDirection="row" height={70} borderWidth={1} borderColor={'black'}>
      <Button style={{ flex: 1 }} title={shown ? 'Hide' : 'Show'} onPress={() => setShown(!shown)} />
    </Box>
  );
};

export default Header;
