import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Platform} from 'react-native';

import{
    Container,
    Body,
    TopMenuWarp,
    LogoImageWarp,
    CloseImageWarp,
    LogoImage,
    CloseImage,
    MemberInfoWarp,
    DeviceInfoWarp,
    PointText,
    BoldText,
    SideText,
    NormalText,
    MoveListWarp,
    Move,
    MoveIcon,
    LogoutWarp,
    LogoutText
} from './SideMenuStyle';

const SideMenuScreen = ({navigation}) => {

  const [list, setList] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMemberInfo();
    });
    return unsubscribe;
  }, [navigation]);


  const getMemberInfo = useCallback(async () => {

    const userData = await AsyncStorage.getItem('userData');

    if (userData !== null) {
      let formdata = new FormData();
      let data = JSON.parse(userData);

      formdata.append('id', data.id);

      axios.post('http://bangb.zone/api/side_member_info', formdata, {
       headers: {
         Accept: 'application/json',
         'Content-Type': 'multipart/form-data',
       },
      })
      .then(response => {
        if (response.data.result === 1) {
          setList({...response.data.list});
        }else{
          Alert.alert(...response.data.msg);
        }
      })
      .catch(e => {
        Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
      });

    }else{
      Alert.alert('로그인 세션이 만료되었습니다.');
      navigation.navigate('Login');
    }
  }, [navigation]);

  return (
    <Container>
      <Body>
        <TopMenuWarp style={{marginTop: Platform.OS === 'ios'? 25: 0}}>
          <LogoImageWarp onPress={() => navigation.navigate('stack', {screen: 'Main'})}>
            <LogoImage
              source={require('../../Assets/Image/logo.png')}
              style={{resizeMode: 'contain'}}
            />
          </LogoImageWarp>
          <CloseImageWarp onPress={() => navigation.goBack()}>
            <CloseImage
              source={require('../../Assets/Image/close.png')}
              style={{resizeMode: 'contain'}}
            />
          </CloseImageWarp>
        </TopMenuWarp>

        <MemberInfoWarp>
          <NormalText>반갑습니다,</NormalText>
          <BoldText>{list.member_name}님</BoldText>

        </MemberInfoWarp>

        <DeviceInfoWarp>
          <PointText>{list.device_count}</PointText>
          <NormalText>대의 기기가 등록되어 있습니다</NormalText>
        </DeviceInfoWarp>

        <MoveListWarp style={{marginBottom: 50}}>

          <Move onPress={() => navigation.navigate('stack', {screen: 'Main'})}>
              <MoveIcon
              source={require('../../Assets/Image/home.png')}
              style={{resizeMode: 'contain'}}
              />
              <SideText>홈</SideText>
          </Move>
          <Move onPress={() => navigation.navigate('stack', {screen: 'MyPage'})}>
              <MoveIcon
              source={require('../../Assets/Image/my_info.png')}
              style={{resizeMode: 'contain'}}
              />
              <SideText>내정보관리</SideText>
          </Move>
          <Move onPress={() => navigation.navigate('stack', {screen: 'Device'})}>
              <MoveIcon
              source={require('../../Assets/Image/device.png')}
              style={{resizeMode: 'contain'}}
              />
              <SideText>기기관리</SideText>
          </Move>
          {/*<Move onPress={() => navigation.navigate('stack', {screen: 'Cctv'})}>
              <MoveIcon
              source={require('../../Assets/Image/cctv.png')}
              style={{resizeMode: 'contain'}}
              />
              <BoldText>CCTV관리</BoldText>
          </Move>*/}
          <Move onPress={() => navigation.navigate('stack', {screen: 'Payment'})}>
              <MoveIcon
              source={require('../../Assets/Image/payment.png')}
              style={{resizeMode: 'contain'}}
              />
              <SideText>결제관리</SideText>
          </Move>
          {/*<Move onPress={() => navigation.navigate('stack', {screen: 'Service'})}>
              <MoveIcon
              source={require('../../Assets/Image/service.png')}
              style={{resizeMode: 'contain'}}
              />
              <BoldText>서비스정책</BoldText>
          </Move>*/}

          <Move onPress={() => navigation.navigate('stack', {screen: 'Setting'})}>
              <MoveIcon
              source={require('../../Assets/Image/setting.png')}
              style={{resizeMode: 'contain'}}
              />
              <SideText>설정</SideText>
          </Move>
        </MoveListWarp>
      </Body>
    </Container>
  );
};

export default SideMenuScreen;
