import 'react-native-gesture-handler';
import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigations';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Fragment>
  );
};

export default App;
