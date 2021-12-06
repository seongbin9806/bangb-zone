import React, {memo, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import {useSelector} from 'react-redux';
import AuthNavigator from './AuthNavigator';

const Root = createStackNavigator();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export default memo(function MainNavigation() {
  const isLoggedin = useSelector(({loginReducer}) => loginReducer.isLogedin);

  return isLoggedin ? (
    <Root.Navigator initialRouteName="drawer">
      <Root.Screen
        name="drawer"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
    </Root.Navigator>
  ) : (
    <AuthNavigator />
  );
});
