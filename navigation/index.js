import React, { useState, useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBrowserHistory, createMemoryHistory } from 'history';
import * as queryString from 'query-string';
export const createDrawerNavigator = require('./navigators/createDrawerNavigator').default;
export const createStackNavigator = require('./navigators/createStackNavigator').default;
export const createBottomTabNavigator = require('./navigators/createBottomTabNavigator').default;

const history = Platform.OS === 'web' ? createBrowserHistory() : createMemoryHistory();

export const getActiveScreen = (state) => {
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveScreen(route.state);
  }
  return { name: route.name, params: route.params };
};

export const getInitialScreen = (initialRouteName, initialRouteParams) => {
  if (Platform.OS === 'web') {
    const path = window.location.pathname.replace('/', '');
    const params = queryString.parse(window.location.search);
    if (path) {
      return { name: path[0].toUpperCase() + path.slice(1), params };
    }
  }
  return { name: initialRouteName, params: initialRouteParams };
};

export const getUrl = (name, params) => {
  const query = queryString.stringify(params);
  return name[0].toLowerCase() + name.slice(1) + (query ? '?' + query : '');
};

export const WebNavigationContainer = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState(null);
  const navigationRef = useRef();
  useEffect(() => {
    if (navigationRef.current) {
      const state = navigationRef.current.getRootState();
      setCurrentScreen(getActiveScreen(state));
    }
    return history.listen((location, action) => {
      if (action === 'POP') {
        navigationRef.current.goBack();
      }
    });
  }, [navigationRef !== undefined && navigationRef !== null]);
  const onStateChange = (state) => {
    const nextScreen = getActiveScreen(state);
    if (currentScreen.name !== nextScreen.name) {
      if (!(nextScreen.name.indexOf('Navigator') > -1)) {
        let navigate = history.push;
        // if (currentScreen && currentScreen.name.indexOf('Navigator') > -1) {
        //   navigate = history.replace;
        // }
        const url = getUrl(nextScreen.name, nextScreen.params);
        navigate(url);
        setCurrentScreen(nextScreen);
      }
    }
  };
  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      {children}
    </NavigationContainer>
  );
};

export const WebNavigator = ({ Comp, screenOptions, initialRouteName, initialRouteParams, children, ...props }) => {
  const { name, params } = getInitialScreen(initialRouteName, initialRouteParams);
  return (
    <Comp screenOptions={screenOptions} initialRouteName={name} initialRouteParams={params} {...props}>
      {React.Children.map(children, (child) => {
        const initialParams = initialRouteName === child.props.name ? initialRouteParams : {};
        return React.cloneElement(child, { initialParams });
      })}
    </Comp>
  );
};
