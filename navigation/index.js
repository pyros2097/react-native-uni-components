import React, { useState, useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBrowserHistory, createMemoryHistory } from 'history';
import * as queryString from 'query-string';
const history = Platform.OS === 'web' ? createBrowserHistory() : createMemoryHistory();

export const getActiveScreen = (state) => {
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveScreen(route.state);
  }
  return { name: route.name, params: route.params };
};

export const getInitialScreen = (initial) => {
  if (Platform.OS === 'web') {
    const path = window.location.pathname.replace('/', '');
    const params = queryString.parse(window.location.search);
    return { name: path ? path : initial, params };
  }
  return { name: initial, params: {} };
};

export const getUrl = (name, params) => {
  const query = queryString.stringify(params);
  return name[0].toLowerCase() + name.slice(1) + (query ? '?' + query : '');
};

export const WebNavigationContainer = ({ setNavigation, children }) => {
  const [currentScreen, setCurrentScreen] = useState(null);
  const navigationRef = useRef();
  useEffect(() => {
    if (navigationRef.current) {
      const state = navigationRef.current.getRootState();
      setCurrentScreen(getActiveScreen(state));
      setNavigation(navigationRef.current);
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
  return (
    <Comp screenOptions={screenOptions} initialRouteName={initialRouteName} {...props}>
      {React.Children.map(children, (child) => {
        const initialParams = initialRouteName === child.props.name ? initialRouteParams : {};
        return React.cloneElement(child, { initialParams });
      })}
    </Comp>
  );
};
