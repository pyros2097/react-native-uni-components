import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, useWindowDimensions } from 'react-native';
import { useLocal } from '@pyros2097/use-promise';

export default function Drawer({ drawerContent, children }) {
  const [shown, setShown] = useLocal('navigationShown');
  const { width: windowWidth } = useWindowDimensions();
  const drawerWidth = useRef(new Animated.Value(0)).current;
  const drawerSize = windowWidth * 0.75;
  const close = () => setShown(false);
  useEffect(() => {
    if (shown) {
      Animated.timing(drawerWidth, {
        toValue: drawerSize,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(drawerWidth, {
        toValue: 0,
        duration: 300,
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
      <View style={{ marginLeft: -drawerSize, width: drawerSize }}>{React.cloneElement(drawerContent, { close })}</View>
      {children}
    </Animated.View>
  );
}
