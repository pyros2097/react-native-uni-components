import React from 'react';
import { useNavigationBuilder, createNavigatorFactory, DrawerRouter } from '@react-navigation/native';
import { DrawerView } from '@react-navigation/drawer';
import ErrorBoundary from '../../ErrorBoundary';

function DrawerNavigator({ initialRouteName, reloadRouteName, children, screenOptions, ...rest }) {
  const { state, descriptors, navigation } = useNavigationBuilder(DrawerRouter, {
    initialRouteName,
    children,
    screenOptions,
  });
  return (
    <ErrorBoundary navigation={navigation} reloadRouteName={reloadRouteName}>
      <DrawerView {...rest} state={state} navigation={navigation} descriptors={descriptors} />
    </ErrorBoundary>
  );
}

export default createNavigatorFactory(DrawerNavigator);
