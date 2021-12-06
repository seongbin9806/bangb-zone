import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import SideMenu from '../SideMenu/SideMenu';
import HomeScreen from '../Home/Home';
import MemberNoticeScreen from '../MemberNotice/MemberNotice';
import StackNavigator from './StackNavigator';
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({route}) => {
  return (
    <Drawer.Navigator
      initialRouteName="stack"
      drawerContent={props => <SideMenu {...props} />}
      screenOptions={{drawerStyle: {width: '80%'}}}>  
      <Drawer.Screen
        name="stack"
        component={StackNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
