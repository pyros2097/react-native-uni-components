import React, { useState } from 'react';
import { TouchableOpacity, SafeAreaView, Text, View, Button, TextInput } from 'react-native';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import { HttpProvider } from '@pyros2097/kvdb';
import { initStore, usePromise, useLocal } from '@pyros2097/use-promise';
import { Box, app, screen } from 'react-native-uni-components';
import { Router, Link, Route, Switch, useHistory, useLocation } from 'react-native-uni-components/react-router';
import queryString from 'query-string';
import Drawer from './Drawer';
import Header from './Header';

Amplify.configure({
  aws_project_region: 'ap-south-1',
  aws_cognito_region: 'ap-south-1',
  aws_user_pools_id: 'ap-south-1_T23RZ5Zc6',
  aws_user_pools_web_client_id: '14drm43cudnmmarelv38k6m0ud',
});
initStore({
  theme: {
    color: 'red',
  },
  navigationShown: false,
});

const store = HttpProvider({
  apiEndPoint: 'https://mq8fagvyqe.execute-api.ap-south-1.amazonaws.com',
  getAuthorizationToken: () => Auth.currentAuthenticatedUser().then((user) => user.signInUserSession.idToken.jwtToken),
});

const Home = screen(() => {
  const history = useHistory();
  const [{ color }] = useLocal('theme');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: color }}>Home</Text>
      <Button title="Login" onPress={() => history.push('/login?email=abc')} />
    </View>
  );
});

const useKey = (key) => usePromise(store.get, key);
const getCurrentUserId = () => usePromise(async () => (await Auth.currentAuthenticatedUser()).username, 'currentUserId');

const Login = screen(() => {
  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const [email, setEmail] = useState('pyros2097+106@gmail.com');
  const [password, setPassword] = useState('');
  const [{ color, ...theme }, setTheme] = useLocal('theme');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: color }}>Email: {params.email}</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <TextInput value={password} onChangeText={setPassword} />
      <Button
        title="Login"
        onPress={async () => {
          setTheme({
            ...theme,
            color: '#0000ff',
          });
          await Auth.signIn({
            username: email.toLowerCase(),
            password: password,
          });
          history.push('/list');
        }}
      />
    </View>
  );
});

const List = screen(() => {
  const [userId] = getCurrentUserId();
  const [currentUser] = useKey('User:' + userId);
  const [currentOrg, setOrg] = useKey('Organisation:1');
  const [orgs, setOrgs] = useKey(['Organisation:1', 'Organisation:1']);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>First Name: {currentUser.firstName}</Text>
      <Text>Last Name: {currentUser.lastName}</Text>
      <Text>Org Name: {currentOrg.name}</Text>
      <View>
        {orgs.map((org, index) => (
          <View key={index + org.name}>
            <Text>
              {index + 1}. {org.name}
            </Text>
          </View>
        ))}
      </View>
      <Button
        title="_ck Me"
        onPress={() => {
          const newData = {
            id: 'Organisation:1',
            name: 'Bleach - ' + (Math.random() * 100).toFixed(2),
            rw: [currentUser.id],
            ro: [],
          };
          store.set(newData);
          setOrg(newData);
          setOrgs([]);
        }}
      />
    </View>
  );
});

const NoMatch = () => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>Page Does not exist</Text>
      <Text>404 - Not Found</Text>
    </Box>
  );
};

const DrawerContent = () => {
  const [_, setShown] = useLocal('navigationShown');
  const history = useHistory();
  const TouchLink = ({ to, children }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          history.push(to);
          setShown(false);
        }}
      >
        {children}
      </TouchableOpacity>
    );
  };
  return (
    <Box flex={1} backgroundColor="gray">
      <TouchLink to="/">
        <Text>Home</Text>
      </TouchLink>
      <TouchLink to="/login">
        <Text>Login</Text>
      </TouchLink>
      <TouchLink to="/list">
        <Text>List</Text>
      </TouchLink>
      <TouchLink to="/unknown">
        <Text>Uknown</Text>
      </TouchLink>
      <TouchLink to="/unknown">
        <Text>GGWP</Text>
      </TouchLink>
    </Box>
  );
};

export default app(() => {
  return (
    <Router>
      <SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
        <Drawer drawerContent={<DrawerContent />}>
          <Box flex={1}>
            <Header />
            <Box flex={1}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/list" component={List} />
                <Route path="*">
                  <NoMatch />
                </Route>
              </Switch>
            </Box>
          </Box>
        </Drawer>
      </SafeAreaView>
    </Router>
  );
});

// Auth.resendSignUp('pyros2097@gmail.com');
// Auth.signUp({
//             username: 'pyros2097+106@gmail.com',
//             password: 'Test@123',
//             attributes: {
//               email: 'pyros2097+106@gmail.com',
//             },
//           });
// Auth.confirmSignUp('pyros2097+106@gmail.com', '107870');
