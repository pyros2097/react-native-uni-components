import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { useLocal } from '@pyros2097/use-promise';
import { Box } from 'react-native-uni-components';
import { useHistory } from 'react-native-uni-components/react-router';
import Menu from './icons/menu-outline.svg';
import ArrowBack from './icons/chevron-back-outline.svg';

const Icon = ({ children }) => {
  if (Platform.OS === 'web') {
    return <img src={children.type} {...children.props} />;
  }
  return children;
};

const Header = () => {
  const [shown, setShown] = useLocal('navigationShown');
  const history = useHistory();
  const hasBack = Platform.OS === 'web' ? 0 : 0;
  return (
    <Box flexDirection="row" height={60} borderWidth={1} borderColor={'black'}>
      {history.length > hasBack ? (
        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => history.goBack()}>
          <Icon>
            <ArrowBack width={32} height={32} />
          </Icon>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => setShown(!shown)}>
        <Icon>
          <Menu width={32} height={32} />
        </Icon>
      </TouchableOpacity>
    </Box>
  );
};

export default Header;
