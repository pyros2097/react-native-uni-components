import React from 'react';
import { useNavigationBuilder, createNavigatorFactory, StackRouter } from '@react-navigation/native';
import { StackView } from '@react-navigation/stack';
import ErrorBoundary from '../../ErrorBoundary';

function StackNavigator({ initialRouteName, reloadRouteName, backBehavior, children, screenOptions, ...rest }) {
  const { state, descriptors, navigation } = useNavigationBuilder(StackRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
  });
  return (
    <ErrorBoundary navigation={navigation} reloadRouteName={reloadRouteName}>
      <StackView {...rest} state={state} navigation={navigation} descriptors={descriptors} />
    </ErrorBoundary>
  );
}

export default createNavigatorFactory(StackNavigator);
