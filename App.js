import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Alert, BackHandler} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/Store/reducers/index';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import { navigationRef, navigate } from './src/Screen/Navigator/AppNavigator';

import AppNavigator from './src/Screen/Navigator/AppNavigator';


function App() {
  async function requestUserPermission() {
    // 알림 동의 ios용
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {

    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000); /** 스플래시 시간 조절 (1초) **/
    } catch (e) {
      console.warn('에러발생');
      console.warn(e);
    }

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onMessage(remoteMessage => { // 앱을 실행 중 일 때(foreground)
      let data = remoteMessage.data;

      if(data.page_name){
          navigate(data.page_name, data);
      }
    });

    messaging().onNotificationOpenedApp(remoteMessage => { // 앱을 실행 중 일 때(background)
      let data = remoteMessage.data;

      if(data.page_name){
          navigate(data.page_name, data);
      }
    });

    messaging().getInitialNotification().then(remoteMessage => { // 앱을 종료 했을 때
        if (remoteMessage) {
          let data = remoteMessage.data;

          if(data.page_name){
              navigate(data.page_name, data);
          }
        }
      });

    requestUserPermission(); // 알림 동의 ios용

    return true;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
