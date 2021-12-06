import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../Login/Login';
import JoinScreen from '../Join/Join';
import JoinAgree1Screen from '../Join/JoinAgree1';
import SearchIdScreen from '../SearchId/SearchId';
import SearchPwdScreen from '../SearchPwd/SearchPwd';
import ChangePwdScreen from '../ChangePwd/ChangePwd';
import IntroScreen from '../Intro/Intro';
import QuestionScreen from '../Intro/question';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Intro">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: '로그인', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Join"
        component={JoinScreen}
        options={{title: '회원가입', headerTitleAlign: 'center'}}
      />

      <Stack.Screen
        name="JoinAgree1"
        component={JoinAgree1Screen}
        options={{title: '이용약관', headerTitleAlign: 'center'}}
      />

      <Stack.Screen
        name="SearchId"
        component={SearchIdScreen}
        options={{title: '아이디 찾기', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="SearchPwd"
        component={SearchPwdScreen}
        options={{title: '비밀번호 찾기', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="ChangePwd"
        component={ChangePwdScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="question"
        component={QuestionScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// export {StackNavigator};
