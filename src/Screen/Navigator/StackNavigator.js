import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../Home/Home';
import MemberNoticeScreen from '../MemberNotice/MemberNotice';
import MyPageScreen from '../MyPage/MyPage';
import DeviceScreen from '../Device/Device';
import DeviceAddScreen from '../DeviceAdd/DeviceAdd';
import DeviceSetScreen from '../DeviceSet/DeviceSet';
import SettingScreen from '../Setting/Setting';
import ServiceScreen from '../Service/Service';
import PaymentScreen from '../Payment/Payment';
import CardAddScreen from '../Card/CardAdd';
import CardAddIntroScreen from '../Card/CardAddIntro';
import CardEndScreen from '../Card/CardEnd';
import SmsSendScreen from '../SmsSend/SmsSend';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MemberNotice"
        component={MemberNoticeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Device"
        component={DeviceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeviceAdd"
        component={DeviceAddScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeviceSet"
        component={DeviceSetScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Service"
        component={ServiceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CardAddIntro"
        component={CardAddIntroScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CardAdd"
        component={CardAddScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CardEnd"
        component={CardEndScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SmsSend"
        component={SmsSendScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// export {StackNavigator};
