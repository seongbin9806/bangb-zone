import React, { useState, useEffect, useCallback } from 'react';
import { Alert, TouchableOpacity, Platform, Linking } from 'react-native';
import {WebView} from 'react-native-webview';
import {HeaderBackScreen} from '../Header/Header';
import SendSMS from 'react-native-sms'
import{
   Container,
   Title,
   BtnSubIcon,
   NontBtn,
   BtnText,
   SendSmsBtn
} from './SmsSendStyle';

const WebViewPageScreen = ({navigation, route}) => {

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {

      if(route.params.cctv_url){
        Alert.alert(route.params.type + "발생!", "CCTV를 확인하시겠습니까?", [
          {
            text: "취소",
            onPress: () => null,
            style: "cancel"
          },
          { text: "확인", onPress: () => {

            let appUrl = route.params.cctv_url,
                SendIntentAndroid = require("react-native-send-intent");

            SendIntentAndroid.isAppInstalled(appUrl)
            .then(isInstalled => {
                if(isInstalled === true){

                  SendIntentAndroid.openApp(appUrl)
                  .then(wasOpened  => {
                      if(wasOpend === false){
                          Alert.alert('어플이 존재하지 않습니다.\nurl 확인 또는 다운로드 받아주세요.');
                      }
                  });
                }else{
                  Alert.alert('어플이 존재하지 않습니다.\nurl확인 또는 다운로드 받아주세요.');
                }
            })
          } }
        ]);
      }
      return true;
    });

    return unsubscribe;
  }, [navigation]);

  const smsSend = (smsData) => {

      let bodyMsg = '(' + smsData.zip_code + ')' + smsData.address + ' ' + smsData.address_detail + '에 '
                    + (smsData.type === '침입'? '침입이 감지되었습니다.' : '화재가 발생하였습니다.') + ' 출동바랍니다.';

      SendSMS.send({
            body: bodyMsg,
            recipients: [smsData.type === '침입'? '112' : '119'],
            successTypes: ['sent', 'queued']
        }, (completed, cancelled, error) => {
            if(completed){
              Alert.alert('SMS Sent Successfully.');
            }else if(cancelled){
              console.log('SMS Sent Cancelled.');
            }else if(error){
              console.log('Some error occured.');
            }
      });

    return true;
  }

    return (
      <>
        <HeaderBackScreen navigation={navigation} />
        <Container>
          <Title>신고하기</Title>
          <SendSmsBtn onPress={ () => { smsSend(route.params); } }>
            <BtnSubIcon
              source={require('../../Assets/Image/btn-icon-bell.png')}
              style={{resizeMode: 'contain'}}
            />
            <BtnText>{route.params.type === '침입'? '112' : '119'} 문자 신고하기</BtnText>
          </SendSmsBtn>

          <NontBtn onPress={ () => { navigation.navigate('Main'); }}>
            <BtnSubIcon
              source={require('../../Assets/Image/btn-icon-home.png')}
              style={{resizeMode: 'contain'}}
            />
            <BtnText>돌아가기</BtnText>
          </NontBtn>
        </Container>
    </>
    );
};

export default WebViewPageScreen;
