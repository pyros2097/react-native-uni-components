import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebNavigationContainer, WebNavigator, getInitialScreen } from 'react-native-uni-components/navigation';

const Home = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home</Text>
    <Button title="Login" onPress={() => navigation.navigate('Login', { email: 'abc' })} />
  </View>
);
const Login = ({ route: { params } }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Login</Text>
    <Text>Email: {params.email}</Text>
  </View>
);

const Stack = createStackNavigator();

export default function App() {
  const [navigation, setNavigation] = useState(null);
  const { name, params } = getInitialScreen();
  return (
    <WebNavigationContainer setNavigation={setNavigation}>
      <WebNavigator Comp={Stack.Navigator} initialRouteName={name} initialRouteParams={params}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </WebNavigator>
    </WebNavigationContainer>
  );
}
