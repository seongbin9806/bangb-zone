
import Loader from  '../Common/Loader';
import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {HeaderBackScreen} from '../Header/Header';
import RNPickerSelect from 'react-native-picker-select';
import {
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';

import{
    Container,
    Body,
    PickerWarp,
    NoticeWarp,
    NoticeImageWarp,
    NoticeImage,
    MainTitleWarp,
    MainPointTitle,
    MainTitle,
    SubTitleWarp,
    SubTitle,
    NoneWarp,
    NoneText,
    customPickerStyles
} from './MemberNoticeStyle';

const MemberNoticeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNoticeList();
    });

    return unsubscribe;
  }, [navigation]);

  const getNoticeList = useCallback(async () => {

    const userData = await AsyncStorage.getItem('userData');

    if (userData !== null) {
      let data = JSON.parse(userData);
      let formdata = new FormData();

      formdata.append('id', data.id);

      axios.post('http://bangb.zone/api/member_notice_list', formdata, {
       headers: {
         Accept: 'application/json',
         'Content-Type': 'multipart/form-data',
       },
      })
      .then(response => {
        if (response.data.result === 1) {
          setNoticeList([...response.data.list]);          
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
        <Loader/>
        <Body>
        {
          noticeList.length > 0?
           noticeList.map((item, index) => {
              return(
                <NoticeWarp key={index}>
                  <NoticeImageWarp>
                    <NoticeImage
                      source={require('../../Assets/Image/logo.png')}
                      style={{resizeMode: 'contain'}}
                    />
                  </NoticeImageWarp>
                  <MainTitleWarp>
                    <MainPointTitle
                      numberOfLines={2}>
                      {item.msg}
                    </MainPointTitle>
                    <SubTitle>{item.reg_date}</SubTitle>
                  </MainTitleWarp>
                </NoticeWarp>
              );
           })
          :
          <NoneWarp>
            <NoneText>아직 알림내역이 없네요!</NoneText>
          </NoneWarp>
        }
        </Body>
    </Container>
  );
};

export default MemberNoticeScreen;
