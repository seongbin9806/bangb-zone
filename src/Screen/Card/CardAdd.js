
import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";
import Postcode from '@actbase/react-daum-postcode';
import {HeaderBackScreen} from '../Header/Header';

import{
    Container,
    Header,
    HeaderWarp,
    HeaderText,
    Body,
    CardAddWarp,
    CardAddText,
    MainText,
    HeaderTextPattern,
    ImportantWarp,
    Important,
    HelpText,
    CommonTextInputWarp,
    CommonTextInput,
    NormalText,
    GoBackWrap,
    GoBackImage
} from './CardAddStyle';


const CardAddScreen = ({navigation, route}) => {

    const [userId, setUserId] = useState('');
    const [card1, setCard1] = useState('');
    const [card2, setCard2] = useState('');
    const [card3, setCard3] = useState('');
    const [card4, setCard4] = useState('');
    const [expiry1, setExpiry1] = useState('');
    const [expiry2, setExpiry2] = useState('');
    const [birth, setBirth] = useState('');
    const [pwd, setPwd] = useState('');

    const onCard1Handler = text => {
      setCard1(text);
    };

    const onCard2Handler = text => {
      setCard2(text);
    };

    const onCard3Handler = text => {
      setCard3(text);
    };

    const onCard4Handler = text => {
      setCard4(text);
    };

    const onExpiry1Handler = text => {
      setExpiry1(text);
    };

    const onExpiry2Handler = text => {
      setExpiry2(text);
    };

    const onBirthHandler = text => {
      setBirth(text);
    };

    const onPwdHandler = text => {
      setPwd(text);
    };

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getMemberInfo();
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

    const CardAddSubmit = (route) => {

        if(!card1 || !card2 || !card3 || !card4){
         Alert.alert('카드번호를 입력해주세요.');
         return false;
       }else if(!expiry1 || !expiry2){
         Alert.alert('카드 유효기간 입력해주세요.');
         return false;
       }else if(!birth){
         Alert.alert('생년월일을 입력해주세요.');
         return false;
       }else if(!pwd){
         Alert.alert('비밀번호 앞 두자리를 입력해주세요.');
         return false;
       }
       let formdata = new FormData();

       const card_number = card1 + '-' + card2 + '-' + card3 + '-' + card4;
       const expiry = '20' + expiry2 + '-' + expiry1 ;

       formdata.append('id', userId);
       formdata.append('card_number', card_number);
       formdata.append('expiry', expiry);
       formdata.append('birth', birth);
       formdata.append('pwd_2digit', pwd);

       axios.post('http://bangb.zone/api/member_card_addition', formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
         })
        .then(response => {

          if (response.data.result === 1) {

            if(route.params.params.type === 'main'){
                navigation.navigate('Main', { screen: 'Main'});
            }else{
              navigation.navigate('Payment');
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
          <Header style={{marginTop: Platform.OS === 'ios' ? 33 : 0}}>
            <HeaderWarp>
              <GoBackWrap onPress={() => navigation.goBack()}>
                <GoBackImage source={require('../../Assets/Image/arr_lef02.png')} />
              </GoBackWrap>
              <HeaderText>결제 카드 등록</HeaderText>
            </HeaderWarp>
          </Header>

          <Body>
            <MainText>결제등록을 위해{'\n'}필요한 정보들을 입력해주세요.</MainText>
            <HeaderTextPattern/>

            <ImportantWarp>
              <Important>⦁</Important>
              <HelpText> 카드번호</HelpText>
            </ImportantWarp>
            <CommonTextInputWarp>
              <CommonTextInput
                placeholder = {'4자리'}
                value={card1}
                onChangeText={onCard1Handler}
                style={{width:'24%', textAlign: 'center'}}
                maxLength={4}
              />
              {/*<Important>-</Important>*/}
              <CommonTextInput
                placeholder = {'4자리'}
                value={card2}
                onChangeText={onCard2Handler}
                style={{width:'24%', textAlign: 'center', marginLeft: 4}}
                maxLength={4}
              />
              {/*<Important>-</Important>*/}
              <CommonTextInput
                placeholder = {'4자리'}
                value={card3}
                onChangeText={onCard3Handler}
                style={{width:'24%', textAlign: 'center', marginLeft: 4}}
                maxLength={4}
              />
              {/*<Important>-</Important>*/}
              <CommonTextInput
                placeholder = {'4자리'}
                value={card4}
                onChangeText={onCard4Handler}
                style={{width:'24%', textAlign: 'center', marginLeft: 4}}
                maxLength={4}
              />
            </CommonTextInputWarp>

            <ImportantWarp style={{width:'50%'}}>
              <Important>⦁</Important>
              <HelpText> 카드 유효기간</HelpText>
            </ImportantWarp>
            <CommonTextInputWarp>
              <CommonTextInput
                placeholder = {'2자리'}
                value={expiry1}
                onChangeText={onExpiry1Handler}
                style={{width:'25%', textAlign: 'center', marginRight: 10}}
                maxLength={2}
              />
              <Important style={{color:'#5A78AF', fontSize: 20, fontWeight: 'bold', paddingTop: 5}}>/</Important>
              <CommonTextInput
                placeholder = {'2자리'}
                value={expiry2}
                onChangeText={onExpiry2Handler}
                style={{width:'25%', textAlign: 'center', marginLeft: 10}}
                maxLength={2}
              />
            </CommonTextInputWarp>



            <ImportantWarp style={{width:'50%'}}>
              <Important>⦁</Important>
              <HelpText> 생년월일</HelpText>
            </ImportantWarp>
            <CommonTextInputWarp>
              <CommonTextInput
                placeholder = {'6자리'}
                value={birth}
                onChangeText={onBirthHandler}
                style={{textAlign: 'center'}}
                maxLength={6}
              />
            </CommonTextInputWarp>


            <ImportantWarp style={{width:'50%'}}>
              <Important>⦁</Important>
              <HelpText> 비밀번호 앞 두자리</HelpText>
            </ImportantWarp>
            <CommonTextInputWarp>
              <CommonTextInput
                placeholder = {'2자리'}
                value={pwd}
                onChangeText={onPwdHandler}
                style={{width:'50%', textAlign: 'center'}}
                maxLength={2}
              />
              <NormalText>* *</NormalText>
            </CommonTextInputWarp>

            <CardAddWarp onPress = { () => CardAddSubmit(route) }>
              <CardAddText>카드등록</CardAddText>
            </CardAddWarp>
          </Body>
        </Container>
    );
};

export default CardAddScreen;
