import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {logout, setLogedin} from '../../Store/actions/userAction';
import {HeaderBackScreen} from '../Header/Header';
import Loader from  '../Common/Loader';

import {
  Container,
  Body,
  SettingWarp,
  SettingText,
  SwitchWarp,
  SwitchImage,
  LogoutWarp,
  LogoutText,
} from './SettingStyle';

const SettingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [alerm, setAlerm] = useState(true);
  const [fineDustAlerm, setFineDustAlerm] = useState(true);
  const [airAlerm, setAirAlerm] = useState(true);
  const [weatherAlerm, setWeatherAlerm] = useState(true);
  const [humidityAlerm, setHumidityAlerm] = useState(true);
  const [fireAlerm, setFireAlerm] = useState(true);
  const [invasionAlerm, setInvasionAlerm] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setAlermInfo();
    });
    return unsubscribe;
  }, [navigation]);

  const logOuthandler = () => {
    AsyncStorage.removeItem('userData');
    dispatch(logout());
    dispatch(setLogedin(false));
    // navigation.navigate('Login');
  };

  const alermHandler = (type) => {
     let formdata = new FormData();

     formdata.append('id', userId);
     formdata.append('type', type);

     axios.post('http://bangb.zone/api/set_member_setting', formdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
     })
     .then(response => {
       if (response.data.result === 1) {

         if(type == 'device_alerm'){
           setAlerm(!alerm);
           setFineDustAlerm(!alerm);
           setAirAlerm(!alerm);
           setWeatherAlerm(!alerm);
           setHumidityAlerm(!alerm);
           setFireAlerm(!alerm);
           setInvasionAlerm(!alerm);
         }else if(type == 'fine_dust_alerm'){
           setFineDustAlerm(!fineDustAlerm);
         }else if(type == 'air_alerm'){
           setAirAlerm(!airAlerm);
         }else if(type == 'weather_alerm'){
           setWeatherAlerm(!weatherAlerm);
         }else if(type == 'humidity_alerm'){
           setHumidityAlerm(!humidityAlerm);
         }else if(type == 'fire_alerm'){
           setFireAlerm(!fireAlerm);
         }else if(type == 'invasion_alerm'){
           setInvasionAlerm(!invasionAlerm);
         }
       }else{
         Alert.alert(response.data.msg);
       }
     })
     .catch(e => {
       Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
     });
  };

  const regexBoolean = (val) => {
    return val === '0'? false : true;
  };

  const setAlermInfo = useCallback(async () => {
    const userData = await AsyncStorage.getItem('userData');

    if (userData !== null) {
      let data = JSON.parse(userData);
      let formdata = new FormData();

      setUserId(data.id);
      formdata.append('id', data.id);

      axios.post('http://bangb.zone/api/member_setting_info', formdata, {
       headers: {
         Accept: 'application/json',
         'Content-Type': 'multipart/form-data',
       },
      })
      .then(response => {
        if (response.data.result === 1) {
          let alermInfo = {...response.data.list};

          setAlerm( regexBoolean(alermInfo.device_alerm) );
          setFineDustAlerm( regexBoolean(alermInfo.fine_dust_alerm) );
          setAirAlerm( regexBoolean(alermInfo.air_alerm) );
          setWeatherAlerm( regexBoolean(alermInfo.weather_alerm) );
          setHumidityAlerm( regexBoolean(alermInfo.humidity_alerm) );
          setFireAlerm( regexBoolean(alermInfo.fire_alerm) );
          setInvasionAlerm( regexBoolean(alermInfo.invasion_alerm) );
        }else{
          Alert.alert(response.data.msg);
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
      <HeaderBackScreen navigation={navigation} />
      <Body>
        <Loader/>
        {/*
        <SettingWarp>
          <SettingText>영업 상태</SettingText>
          <SwitchWarp onPress={ () => { alermHandler('is_open'); } }>
            <SwitchImage
              source={
                isOpen == true
                  ? require('../../Assets/Image/auto_active.png')
                  : require('../../Assets/Image/auto_none.png')
              }
              style={{resizeMode: 'contain'}}
            />
          </SwitchWarp>
        </SettingWarp>
        */}
        <SettingWarp>
          <SettingText>전체 알림수신</SettingText>
          <SwitchWarp onPress={ () => { alermHandler('device_alerm'); } }>
            <SwitchImage
              source={
                alerm == true
                  ? require('../../Assets/Image/auto_active.png')
                  : require('../../Assets/Image/auto_none.png')
              }
              style={{resizeMode: 'contain'}}
            />
          </SwitchWarp>
        </SettingWarp>

        {/* <SettingWarp>
          <SettingText>미세먼지 알림</SettingText>
          <SwitchWarp onPress={ () => {alermHandler('fine_dust_alerm'); } }>
            <SwitchImage
              source={
                fineDustAlerm == true
                  ? require('../../Assets/Image/auto_active.png')
                  : require('../../Assets/Image/auto_none.png')
              }
              style={{resizeMode: 'contain'}}
            />
          </SwitchWarp>
        </SettingWarp>

        <SettingWarp>
          <SettingText>공기질 알림</SettingText>
          <SwitchWarp onPress={ () => {alermHandler('air_alerm');}  }>
            <SwitchImage
              source={
                airAlerm == true
                  ? require('../../Assets/Image/auto_active.png')
                  : require('../../Assets/Image/auto_none.png')
              }
              style={{resizeMode: 'contain'}}
            />
          </SwitchWarp>
        </SettingWarp>

        <SettingWarp>
          <SettingText>날씨 알림</SettingText>
          <SwitchWarp onPress={ () => {alermHandler('weather_alerm');} }>
            <SwitchImage
              source={
                weatherAlerm == true
                  ? require('../../Assets/Image/auto_active.png')
                  : require('../../Assets/Image/auto_none.png')
              }
              style={{resizeMode: 'contain'}}
            />
          </SwitchWarp>
        </SettingWarp>

        <SettingWarp>
          <SettingText>습도 알림</SettingText>
          <SwitchWarp onPress={ () => {alermHandler('humidity_alerm');} }>
            <SwitchImage
              source={
                humidityAlerm == true
                  ? require('../../Assets/Image/auto_active.png')
                  : require('../../Assets/Image/auto_none.png')
              }
              style={{resizeMode: 'contain'}}
            />
          </SwitchWarp>
        </SettingWarp> */}

        <SettingWarp>
          <SettingText>화재 알림</SettingText>
          <SwitchWarp onPress={ () => {alermHandler('fire_alerm');} }>
            <SwitchImage
              source={
                fireAlerm == true
                  ? require('../../Assets/Image/auto_active.png')
                  : require('../../Assets/Image/auto_none.png')
              }
              style={{resizeMode: 'contain'}}
            />
          </SwitchWarp>
        </SettingWarp>

        <SettingWarp>
          <SettingText>적침입 알림</SettingText>
          <SwitchWarp onPress={ () => {alermHandler('invasion_alerm');} }>
            <SwitchImage
              source={
                invasionAlerm == true
                  ? require('../../Assets/Image/auto_active.png')
                  : require('../../Assets/Image/auto_none.png')
              }
              style={{resizeMode: 'contain'}}
            />
          </SwitchWarp>
        </SettingWarp>

        <LogoutWarp onPress={() => logOuthandler()}>
          <LogoutText>로그아웃</LogoutText>
        </LogoutWarp>
      </Body>
    </Container>
  );
};

export default SettingScreen;
