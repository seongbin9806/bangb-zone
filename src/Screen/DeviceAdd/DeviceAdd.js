
import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch} from 'react-redux';
import {Alert, BackHandler} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";
import Postcode from '@actbase/react-daum-postcode';
import {HeaderBackScreen} from '../Header/Header';
import {useNavigationState} from '@react-navigation/core';
import RNAndroidInstalledApps from 'react-native-android-installed-apps';

import{
    Container,
    Body,
    DeviceAddWarp,
    DeviceAddText,
    MainText,
    HeaderTextPattern,
    ImportantWarp,
    Important,
    HelpText,
    PolicyWarp,
    AddressWarp,
    AddressSearchBtn,
    AddressText,
    CommonTextInput,
    NormalText,
    MovePolicy,
    SubmitJoin,
    JoinText,
    ModalCloseWarp,
    ModalCloseImage,
    ModalContainer,
    CctvBtnWarp,
    CctvAddBtn,
    AppListWarp,
    AppInfoWarp,
    AppIcon,
    AppName
} from './DeviceAddStyle';


const DeviceAddScreen = ({navigation, route}) => {

    const {routes} = useNavigationState(state => state);
    const [userId, setUserId] = useState('');
    const [isModal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [sido, setSido] = useState('');
    const [sidoEnglish, setSidoEnglish] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [appIcon, setAppIcon] = useState('');
    const [appName, setAppName] = useState('');
    const [cctvUrl, setCctvUrl] = useState('');

    const onNameHandler = text => {
      setName(text);
    };

    const onAddressDetailkHandler = text => {
      setAddressDetail(text);
    };

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {

        getMemberInfo();
        RNAndroidInstalledApps.getNonSystemApps()
        .then(apps => {
          setAppList(apps);
        })
        .catch(error => {
          alert(error);
        });
      });
      return unsubscribe;
    }, [navigation]);

    const getMemberInfo = useCallback(async () => {

      const userData = await AsyncStorage.getItem('userData');

      if (userData !== null) {
        let data = JSON.parse(userData);

        setUserId(data.id);
      }else{
        Alert.alert('로그인 세션이 만료되었습니다.');
        navigation.navigate('Login');
      }
    }, [navigation]);

    const setFullAddress = useCallback(async (sido, sidoEnglish, tmpZipcode, tmpAddress, tmpAddressDetail) => {
      try {
          setSido(sido);
          setSidoEnglish(sidoEnglish);
          setZipCode(tmpZipcode);
          setAddress(tmpAddress);
          setAddressDetail(tmpAddressDetail);
          setModal(false);
      } catch (e) {
        console.log(e);
      }
    }, []);

    const setCctvInfo = useCallback((app_icon, app_name, cctv_url) => {
      setAppIcon(app_icon);
      setAppName(app_name);
      setCctvUrl(cctv_url);
      setAppModal(false);
    }, []);

    const DeviceAddSubmit = (route) => {

        if(!name){
         Alert.alert('업체명을 입력해주세요.');
         return false;
       }else if(!zipCode || !address){
         Alert.alert('주소를 입력해주세요.');
         return false;
       }else if(!addressDetail){
         Alert.alert('상세주소를 입력해주세요.');
         return false;
       }
       let formdata = new FormData();

       formdata.append('id', userId);
       formdata.append('device_name', name);
       formdata.append('sido', sido);
       formdata.append('sido_english', sidoEnglish);
       formdata.append('zip_code', zipCode);
       formdata.append('address', address);
       formdata.append('address_detail', addressDetail);
       formdata.append('app_icon', appIcon);
       formdata.append('app_name', appName);
       formdata.append('cctv_url', cctvUrl);

       axios.post('http://bangb.zone/api/device_insert', formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
         })
        .then(response => {

          if (response.data.result === 1) {
            Alert.alert('등록되었습니다.');

            if(route.params.params.type === 'main'){
                navigation.navigate('Main');
            }else{
                navigation.navigate('Device');
            }
          } else {
            Alert.alert(response.data.msg);
          }
        })
        .catch(e => {
          Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
        });
    };

    return (
        <Container>

          {
            route.params.params.type === 'main'?(
              null
            ):(
            <HeaderBackScreen navigation={navigation} />
            )
          }
          <Body>
            <MainText>기기등록을 위해{'\n'}필요한 정보들을 입력해주세요.</MainText>
            <HeaderTextPattern/>

            <ImportantWarp>
              <Important>⦁</Important>
              <HelpText> 업체명</HelpText>
            </ImportantWarp>
            <CommonTextInput
              placeholder = {'업체명을 입력해주세요'}
              value={name}
              onChangeText={onNameHandler}
            />

            <AddressWarp onPress={() => setModal(true)}>
              <ImportantWarp>
                <Important>⦁</Important>
                <HelpText> 우편번호</HelpText>
              </ImportantWarp>
              <CommonTextInput
                placeholder = {'우편번호'}
                value={zipCode}
                editable = {false}
                style={{width:'60%'}}
              />
              <AddressSearchBtn>
                <AddressText>주소찾기</AddressText>
              </AddressSearchBtn>
            </AddressWarp>

            <Modal isVisible={isModal}>
              <ModalCloseWarp  onPress={() => setModal(false)}>
                <ModalCloseImage
                  source={require('../../Assets/Image/close.png')}
                  style={{resizeMode: 'contain'}}
                />
              </ModalCloseWarp>
              <Postcode
                style={{ width: '100%', height: '80%' }}
                jsOptions={{ animation: true, hideMapBtn: true }}
                onSelected={data => {
                   console.log(data);
                   setFullAddress(data.sido, data.sidoEnglish, data.zonecode, data.roadAddress, data.buildingName);
                 }}
              />
            </Modal>

            <ImportantWarp>
              <Important>⦁</Important>
              <HelpText> 주소</HelpText>
            </ImportantWarp>
            <CommonTextInput
              placeholder = {'주소'}
              value={address}
              editable = {false}
            />

            <ImportantWarp>
              <Important>⦁</Important>
              <HelpText> 상세주소</HelpText>
            </ImportantWarp>
            <CommonTextInput
              placeholder = {'상세주소를 입력해주세요'}
              value={addressDetail}
              onChangeText={onAddressDetailkHandler}
            />

            <ImportantWarp>
              <HelpText> CCTV어플</HelpText>
            </ImportantWarp>

            {cctvUrl?
              <AppInfoWarp style={{marginTop: 10, marginLeft: -20, borderBottomWidth: 0}}>
                 <AppIcon
                   style={{resizeMode: 'contain'}}
                   source={{uri: appIcon } }
                 />
                 <AppName>{appName}</AppName>
              </AppInfoWarp>
              :
              null
            }

            <CctvBtnWarp>
              <CctvAddBtn onPress={() => setAppModal(true)} >
                <DeviceBtnText>{cctvUrl? '어플바꾸기' : '어플등록'}</DeviceBtnText>
              </CctvAddBtn>
            </CctvBtnWarp>

            <Modal isVisible={isAppModal}>
              <ModalCloseWarp  onPress={() => setAppModal(false)}>
                <ModalCloseImage
                  source={require('../../Assets/Image/close.png')}
                  style={{resizeMode: 'contain'}}
                />
              </ModalCloseWarp>
              <AppListWarp>
                <ModalContainer>
                  {
                      appList.map((item, index) => {
                        return(
                          <AppInfoWarp
                            key={index}
                            onPress={() => setCctvInfo('data:image/png;base64, ' + item.icon, item.appName, item.packageName) }
                          >
                             <AppIcon
                               style={{resizeMode: 'contain'}}
                               source={{uri: 'data:image/png;base64, ' + item.icon } }
                             />
                             <AppName>{item.appName}</AppName>
                          </AppInfoWarp>
                        );
                      })
                  }
                </ModalContainer>
              </AppListWarp>
            </Modal>

            <DeviceAddWarp style={{marginBottom:70}} onPress = { () => DeviceAddSubmit(route) }>
              <DeviceAddText>기기등록</DeviceAddText>
            </DeviceAddWarp>
          </Body>
        </Container>
    );
};

export default DeviceAddScreen;
