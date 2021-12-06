
import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from  '../Common/Loader';
import {HeaderBackScreen} from '../Header/Header';

import{
    Container,
    Body,
    DeviceAddWarp,
    DeviceAddText,
    DeviceListBox,
    DeviceListTextWarp,
    DeviceName,
    DeviceListWarp,
    DeviceImage,
    DeviceOrderTextWarp,
    DeviceOrderText,
    DeviceText,
    AddressText,
    AddressDerailText,
    MoreImageWarp,
    MoreImage,
    GearingWarp,
    Gearing
} from './DeviceStyle';

const DeviceScreen = ({navigation}) => {

    const [list, setList] = useState([]);

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

        axios.post('http://bangb.zone/api/device_list', formdata, {
         headers: {
           Accept: 'application/json',
           'Content-Type': 'multipart/form-data',
         },
        })
        .then(response => {
          if (response.data.result === 1) {
            setList([...response.data.list]);
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
            {/*<DeviceAddWarp onPress={
              () => {
                navigation.navigate('DeviceAdd', {
                  screen: 'DeviceAdd',
                  params: {type: 'default'}
                });
              }
            }>
              <DeviceAddText>기기등록</DeviceAddText>
            </DeviceAddWarp>
            */}
            <DeviceListBox>
            {
              list.length > 0?(
                 list.map((item, index) => {
                    return(
                      <DeviceListWarp key={index}
                       onPress={() =>
                          navigation.navigate('DeviceSet', {
                            screen: 'DeviceSet',
                            params: {device_idx: item.device_idx},
                          })
                       }
                      >
                        <DeviceListTextWarp>
                          <DeviceImage
                            source={require('../../Assets/Image/location.png')}
                            style={{resizeMode: 'contain'}}
                          />
                           <DeviceName>
                              {item.device_name}
                           </DeviceName>
                        </DeviceListTextWarp>

                        <DeviceListTextWarp style={{marginTop: 7}}>
                           <AddressText>
                              ({item.zip_code}){item.address}
                           </AddressText>
                        </DeviceListTextWarp>

                        <DeviceListTextWarp style={{marginTop: 7}}>
                          <AddressDerailText>
                             {item.address_detail}
                          </AddressDerailText>
                        </DeviceListTextWarp>
                      </DeviceListWarp>
                    );
                 })
               )
               :
               (
                 <GearingWarp>
                   <Gearing
                     source={require('../../Assets/Image/Home/gearing.png')}
                     style={{resizeMode: 'contain'}}
                   />
                 </GearingWarp>
               )
              }
            </DeviceListBox>
          </Body>
        </Container>
    );
};

export default DeviceScreen;
