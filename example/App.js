import React from 'react';
import { View, Text, Button } from 'react-native';
import { WebNavigationContainer, WebNavigator, getInitialScreen, createStackNavigator } from 'react-native-uni-components/navigation';

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
  const { name, params } = getInitialScreen('Home');
  return (
    <WebNavigationContainer>
      <WebNavigator Comp={Stack.Navigator} initialRouteName={name} initialRouteParams={params}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </WebNavigator>
    </WebNavigationContainer>
  );
}
