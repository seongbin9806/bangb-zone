import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
  BackHandler,
  Linking
} from 'react-native';

import {useDispatch} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../Header/Header';
import Loader from '../Common/Loader';
import SideMenu from '../SideMenu/SideMenu';
import RNPickerSelect from 'react-native-picker-select';
import {useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {useNavigationState} from '@react-navigation/core';
import Modal from "react-native-modal";

import {
  Container,
  Body,
  RealLoginWarp,
  customPickerStyles,
  TopWarp,
  SpacingView,
  SpacingText,
  SpacingText2,
  ModalCloseWarp,
  ModalCloseImage,
  GearingWarp,
  Gearing,
  GoWayWarp,
  GoWayText,
  WeatherBox,
  WeatherWarp,
  AddressWarp,
  AddressText,
  AddressIcon,
  WeatherIcon,
  SidoWeatherWarp,
  WeatherText,
  WeatherBoldText,
  BottomWarp,
  InsideWeatherWarp,
  InsideWeatherBox,
  BlueText,
  BlackText,
  SubTitle,
  InsideAirWarp,
  AirStatusWarp,
  NulldataWarp,
  Nulldata,
  AirStatusIcon,
  AirStatusText,
  Row,
  DirectionColumn,
  NullTextWarp,
  NullText,
  EmergencyWarp,
  EmergencyIcon,
  EmergencyText
} from './HomeStyle';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isCard, setIsCard] = useState(0);
  const [device, setDevice] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [serialData, setSerialData] = useState({});
  const {routes} = useNavigationState(state => state);

  var device_idx = 0;

  useEffect(() => {

    const backAction = () => {
      let screenName = '';

      if(routes.length >= 1){
          screenName = routes[routes.length - 1].name;
      }

      if (screenName === 'Main' || screenName === 'CardAddIntro') {
        Alert.alert('잠깐!', '앱을 종료하시겠습니까?', [
          { text: '취소', onPress: () => null },
          {text: '확인', onPress: () => BackHandler.exitApp()},
        ]);
      } else {
        navigation.goBack();
      }
      return true;
    };

    const action = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => action.remove();
  }, [routes]);

  /* 2021-11-30 작업 (수정필요) 시작*/
  useEffect(() => {
     let interval = setInterval(() => {
        if(device_idx){
          getSerialData();
        }
     }, 10000);

     return () => clearInterval(interval);
  }, []);
/* 2021-11-30 작업 (수정필요) 끝*/

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDeviceList();
    });

    return unsubscribe;
  }, [navigation]);

  const getDeviceList = useCallback(async () => {
    const userData = await AsyncStorage.getItem('userData');

    if (userData !== null) {
      let data = JSON.parse(userData);
      let formdata = new FormData();

      formdata.append('id', data.id);

      axios
        .post('http://bangb.zone/api/label_device_list', formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response.data.result === 1) {
            setDeviceList([...response.data.list]);

            if(!response.data.card_info.card_idx){ // 카드 등록이 안 되어 있을 때 강제로 이동
              navigation.navigate('CardAddIntro');
              return false;
            }else if(response.data.card_info.ins_month === '0'){
              navigation.navigate('CardEnd');
              return false;
            }
            if(response.data.list.length > 0){
              
              if(!device_idx){
                device_idx = response.data.first_device_idx;
              }
              setDevice(device_idx);
              getSerialData();
            }
          } else {
            Alert.alert(...response.data.msg);
          }
        })
        .catch(e => {
          Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
        });
    } else {
      Alert.alert('로그인 세션이 만료되었습니다.');
      navigation.navigate('Login');
    }
  }, [navigation, routes]);

  const chagneDevice = useCallback((set_device_idx) => {
    device_idx = set_device_idx;
    setDevice(device_idx);
    getSerialData();
  }, []);

  const getSerialData = () => {

      let formdata = new FormData();

      console.log('device_idx : ' + device_idx);
      formdata.append('device_idx', device_idx);

      axios
      .post('http://bangb.zone/api/get_serial_data', formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response.data.result === 1) {
            setSerialData({...response.data.serial_info});
          } else {
            Alert.alert(...response.data.msg);
          }
        })
        .catch(e => {
          Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
        });
  }

  return (
    <Container>
      <Loader />
      <Header navigation={navigation} />
      <Body>
        {/* {deviceList.length > 0 ? (  */}
        <RealLoginWarp>
          {serialData.sido?
            <TopWarp
              source={
                (serialData.api_dust >= 0 && serialData.api_dust <= 30)? require('../../Assets/Image/Home/good_dust.png') :
                (serialData.api_dust >= 31 && serialData.api_dust <= 80)? require('../../Assets/Image/Home/usually_dust.png') :
                require('../../Assets/Image/Home/bed_dust.png')
              }
              style={{resizeMode: 'contain'}}>
              <WeatherWarp>
                <AddressWarp>
                  <AddressIcon
                    source={require('../../Assets/Image/Home/address.png')}
                    style={{resizeMode: 'contain'}}
                  />
                  <AddressText>{serialData.sido}</AddressText>
                </AddressWarp>
                <WeatherBox>
                  <WeatherIcon
                    source={
                      (serialData.weather === '눈')? require('../../Assets/Image/Home/snow.png') :
                      (serialData.weather === '조금흐림')? require('../../Assets/Image/Home/slightly_blur.png') :
                      (serialData.weather === '흐림')? require('../../Assets/Image/Home/blur.png') :
                      (serialData.weather === '비')? require('../../Assets/Image/Home/rain.png') :
                      require('../../Assets/Image/Home/sun.png')
                    }
                    style={{resizeMode: 'contain'}}
                  />
                  <WeatherText>{serialData.weather}</WeatherText>
                </WeatherBox>
              </WeatherWarp>
              <SidoWeatherWarp>
                <WeatherText>온도</WeatherText>
                <WeatherBoldText>{serialData.api_temp}°C</WeatherBoldText>
                <WeatherText>습도</WeatherText>
                <WeatherBoldText>{serialData.api_humi}%</WeatherBoldText>
                <WeatherText>미세먼지</WeatherText>
                <WeatherBoldText>
                  {
                    (serialData.api_dust >= 0 && serialData.api_dust <= 30)? '좋음' :
                    (serialData.api_dust >= 31 && serialData.api_dust <= 80)? '보통' :
                    '나쁨'
                  }
                </WeatherBoldText>
              </SidoWeatherWarp>
            </TopWarp>
          :
            <SpacingView
              source={require('../../Assets/Image/Home/empty_bg.png')}
              style={{resizeMode: 'contain'}}
            >
              <SpacingText2>
                현장 PC에서 방비존 사이트를{'\n'}
                통해 프로그램을 다운받아{'\n'}
                기기를 연결해주세요.
              </SpacingText2>

              <GoWayWarp onPress={() => setIsModal(true) }>
                <GoWayText>연동하기</GoWayText>
              </GoWayWarp>

              <Modal isVisible={isModal}>
                <ModalCloseWarp  onPress={() => setIsModal(false)}>
                  <ModalCloseImage
                    source={require('../../Assets/Image/close.png')}
                    style={{resizeMode: 'contain'}}
                  />
                </ModalCloseWarp>
                <GearingWarp>
                  <Gearing
                    source={require('../../Assets/Image/Home/gearing.png')}
                    style={{resizeMode: 'contain'}}
                  />
                </GearingWarp>
              </Modal>
            </SpacingView>
          }

          <BottomWarp>
            {deviceList.length > 0 ?
            <RNPickerSelect
              value={device}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={(itemValue, itemIndex) =>  chagneDevice(itemValue) }
              items={deviceList}
              style={{
                ...customPickerStyles,
                borderWidth: 1,
                borderColor: '#c5deff',
                placeholder: {
                  color: '#888',
                },
              }}
              Icon={() => {
                return (
                  <TouchableOpacity
                    style={{
                      transform: [{rotate: '90deg'}],
                      height: 45,
                      width: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../Assets/Image/arr_rg_1.png')}
                      style={{
                        width: Platform.OS === 'android' ? 10 : 15,
                        height: Platform.OS === 'android' ? 10 : 15,
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
            :
            null
          }

            <Row>
              <DirectionColumn>
                <SubTitle>화재 여부</SubTitle>
                <EmergencyWarp>
                  {!serialData.fume?
                    <NullText>-</NullText>
                  :
                    <>
                      <EmergencyIcon
                        source={
                          (serialData.fume === '1' && serialData.fire === '1')? require('../../Assets/Image/Home/danger.png') :
                          require('../../Assets/Image/Home/safety.png')
                        }
                        style={{resizeMode: 'contain'}}
                      />
                      <EmergencyText>{(serialData.fume === '1' && serialData.fire === '1')? '위험' : '안전'}</EmergencyText>
                    </>
                  }
                </EmergencyWarp>
              </DirectionColumn>

              <DirectionColumn>
                <SubTitle>침입 여부</SubTitle>
                <EmergencyWarp>
                {!serialData.detect?
                    <NullText>-</NullText>
                  :
                  <>
                    <EmergencyIcon
                      source={
                        serialData.detect === '1'? require('../../Assets/Image/Home/danger.png') :
                        require('../../Assets/Image/Home/safety.png')
                      }
                      style={{resizeMode: 'contain'}}
                    />
                    <EmergencyText>{serialData.detect === '1'? '위험' : '안전'}</EmergencyText>
                  </>
                }
                </EmergencyWarp>
              </DirectionColumn>
            </Row>

            <InsideWeatherWarp>
              <InsideWeatherBox>
                <BlueText>실내온도</BlueText>
                <BlackText>
                  {!serialData.temp? '-' :
                   serialData.temp + '°C'}
                </BlackText>
              </InsideWeatherBox>
              <InsideWeatherBox>
                <BlueText>실내습도</BlueText>
                <BlackText>
                {!serialData.humi? '-' :
                 serialData.humi + '%'}
                </BlackText>
              </InsideWeatherBox>
              <InsideWeatherBox>
                <BlueText>미세먼지</BlueText>
                <BlackText>
                {
                  (!serialData.dust || serialData.dust === '-1')? '-' :
                  (serialData.dust >= '0' && serialData.dust < '15')? '좋음' :
                  (serialData.dust >= '15' && serialData.dust <= '35')? '보통' :
                  '나쁨'
                }
                </BlackText>
              </InsideWeatherBox>
            </InsideWeatherWarp>

            <SubTitle>실내 공기질</SubTitle>
            <InsideAirWarp>
              {!serialData.air_status?
                (
                  <NulldataWarp>
                    <Nulldata>No Data</Nulldata>
                  </NulldataWarp>
                ):
                (
                  <>
                    <AirStatusWarp>
                      <AirStatusIcon
                        source={
                          serialData.air_status === 5? require('../../Assets/Image/Home/air_1.png') :
                          (serialData.air_status === 4 || serialData.air_status === 3)? require('../../Assets/Image/Home/air_2.png') :
                          serialData.air_status === 2? require('../../Assets/Image/Home/air_3.png') :
                          require('../../Assets/Image/Home/air_4.png')
                        }
                        style={{resizeMode: 'contain'}}
                      />
                      <AirStatusText>
                      {
                        serialData.air_status === 5? '깨끗해요!' :
                        (serialData.air_status === 4 || serialData.air_status === 3)? '적당해요!' :
                        serialData.air_status === 2? '주의가 필요해요!' : '위험해요!'
                      }
                      </AirStatusText>
                    </AirStatusWarp>
                    <AirStatusWarp>
                      <AirStatusIcon
                        source={
                          serialData.air_status === 5? require('../../Assets/Image/Home/air_status_5.png') :
                          serialData.air_status === 4? require('../../Assets/Image/Home/air_status_4.png') :
                          serialData.air_status === 3? require('../../Assets/Image/Home/air_status_3.png') :
                          serialData.air_status === 2? require('../../Assets/Image/Home/air_status_2.png') :
                          require('../../Assets/Image/Home/air_status_1.png')
                        }
                        style={{width: '80%', resizeMode: 'contain'}}
                      />
                    </AirStatusWarp>
                  </>
                )
            }

            </InsideAirWarp>
          </BottomWarp>
        </RealLoginWarp>
      </Body>
    </Container>
  );
};

export default HomeScreen;
