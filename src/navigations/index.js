import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from '../constants';
import {LandingScreen, CountryDetailsScreen} from '../screens';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{title: 'Welcome'}}
        name={Routes.LANDING}
        component={LandingScreen}
      />
      <Stack.Screen
        options={{title: 'About Country'}}
        name={Routes.COUNTRY_DETAILS}
        component={CountryDetailsScreen}
      />
    </Stack.Navigator>
  );
};
