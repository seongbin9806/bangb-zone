import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from  '../Common/Loader';
import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: #ffffff;
`;

export const Body = styled.ScrollView`
`;

export const Header = styled.View`
  width: 100%;
  height: 80px;
  background: #1B274C;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const GoBackWrap = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  padding-left: 30px;
`;

export const GoBackImage = styled.Image``;

export const HeaderWarp = styled.View`
  flex-direction: row;
`;

export const HeaderText = styled.Text`
  display: flex;
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin-left: -5px;
`;

export const TextCenter = styled.Text`
  font-family: 'BMJUA_ttf';
  font-size: 22px;
  display: flex;
  text-align: center;
  margin-top: 50px;
`;

export const CardSelectWarp = styled.View`
  display: flex;
  justify-content: center;
  margin: 30px auto;
  width: 90%;
`;

export const OldCardBtn = styled.TouchableOpacity`
  border-radius: 5px;
  background: #5A6AA8;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NewCardBtn = styled.TouchableOpacity`
  margin-top: 30px;
  border-radius: 5px;
  background: #8b8b8b;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnText = styled.Text`
    font-size: 18px;
    color: white;
    text-align: center;
    font-family: 'BMJUA_ttf';
`;

const CardEndScreen = ({navigation}) => {

  const [cardInfo, setCardInfo] = useState({});
  const [userId, setUserId] = useState('');

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
      let formdata = new FormData();

      setUserId(data.id);
      formdata.append('id', data.id);

      axios.post('http://bangb.zone/api/get_payment_info', formdata, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response.data.result === 1) {
              setCardInfo({...response.data.card_info});
          } else {
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

  const oldCardContinue = () => {

    let formdata = new FormData();

    formdata.append('id', userId);
    formdata.append('card_addition_type', 'old');
    formdata.append('card_number', cardInfo.real_card_number);
    formdata.append('expiry', cardInfo.expiry);
    formdata.append('birth', cardInfo.birth);
    formdata.append('pwd_2digit', cardInfo.pwd_2digit);

    axios.post('http://bangb.zone/api/member_card_addition', formdata, {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response.data.result === 1) {
          Alert.alert('기존 카드로 진행되었습니다.');
          navigation.navigate('Main');
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
          <Body>
            <Header style={{marginTop: Platform.OS === 'ios' ? 33 : 0}}>
              <HeaderWarp>
                <HeaderText>이용료 만료</HeaderText>
              </HeaderWarp>
            </Header>

            <TextCenter>
              앗! 할부기간이 만료되었습니다.{'\n'}
              기간을 연장시켜주세요.
            </TextCenter>
            <CardSelectWarp>
              <OldCardBtn>
                <BtnText onPress={ () => oldCardContinue() }>
                  기존 카드로 진행하기{'\n'}
                  ({cardInfo.card_name}){cardInfo.card_number}
                </BtnText>
              </OldCardBtn>
              <NewCardBtn onPress={ () => navigation.navigate('CardAdd')}>
                <BtnText>새로운 카드 정보 등록하기</BtnText>
              </NewCardBtn>
            </CardSelectWarp>
          </Body>
        </Container>
    );
};

export default CardEndScreen;
