import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, View, Animated, Easing } from 'react-native';
import { useLocal } from '@pyros2097/use-promise';

function useWindowDimensions() {
  const [dims, setDims] = useState(() => Dimensions.get('window'));
  useEffect(() => {
    function handleChange({ window }) {
      setDims(window);
    }
    Dimensions.addEventListener('change', handleChange);
    setDims(Dimensions.get('window'));
    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);
  return dims;
}

export default function Drawer({ drawerContent, children }) {
  const [shown, setShown] = useLocal('navigationShown');
  const { width: windowWidth } = useWindowDimensions();
  const drawerWidth = useRef(new Animated.Value(0)).current;
  const drawerSize = windowWidth * 0.75;
  useEffect(() => {
    if (shown) {
      Animated.timing(drawerWidth, {
        toValue: drawerSize,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(drawerWidth, {
        toValue: 0,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [shown]);
  return (
    <Animated.View
      style={{
        flex: 1,
        flexDirection: 'row',
        transform: [{ translateX: drawerWidth }],
      }}
    >
      <View style={{ marginLeft: -drawerSize, width: drawerSize }}>{drawerContent}</View>
      {children}
    </Animated.View>
  );
}
