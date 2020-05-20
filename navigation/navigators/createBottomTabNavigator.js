import React from 'react';
import { useNavigationBuilder, createNavigatorFactory, TabRouter } from '@react-navigation/native';
import { BottomTabView } from '@react-navigation/bottom-tabs';
import ErrorBoundary from '../../ErrorBoundary';

function BottomTabNavigator({ initialRouteName, reloadRouteName, children, screenOptions, ...rest }) {
  const { state, descriptors, navigation } = useNavigationBuilder(TabRouter, {
    initialRouteName,
    children,
    screenOptions,
  });
  return (
    <ErrorBoundary navigation={navigation} reloadRouteName={reloadRouteName}>
      <BottomTabView {...rest} state={state} navigation={navigation} descriptors={descriptors} />
    </ErrorBoundary>
  );
}

export default createNavigatorFactory(BottomTabNavigator);
