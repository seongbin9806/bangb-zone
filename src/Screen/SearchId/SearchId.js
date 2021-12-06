
import React, { useState } from 'react';
import {Alert, Platform} from 'react-native';
import axios from 'axios';

import{
    Container,
    Body,
    MainText,
    HeaderTextPattern,
    ImportantWarp,
    Important,
    HelpText,
    PolicyWarp,
    TelWarp,
    CertifiBtn,
    CommonTextInput,
    SubmitBtn,
    BtnText
} from './SearchIdStyle';

const SearchIdScreen = ({navigation}) => {

  const [tel, setTel] = useState('');
  const [certi, setCerti] = useState('');
  const [isCerti, setIsCerti] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const onTelHandler = text => {
    setTel(text);
  };

  const onCertiHandler = text => {
    setCerti(text);
  };

  const SubmitAction = () => {

    if(!tel){
       Alert.alert('연락처를 입력해주세요.');
       return false;
    }else if(!certi){
      Alert.alert('연락처를 인증해주세요.');
      return false;
    }

    let formdata = new FormData();

    formdata.append('phone', tel);
    formdata.append('certi_number', certi);

    axios
      .post('http://bangb.zone/api/member_search_id', formdata, {
       headers: {
         Accept: 'application/json',
         'Content-Type': 'multipart/form-data',
       },
      })
     .then(response => {

       if (response.data.result === 1) {
         Alert.alert(response.data.msg);         
         navigation.navigate('Login');
       } else {
         Alert.alert(response.data.msg);
       }
     })
     .catch(e => {
       Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
     });
  }

  const Send_sms = () => {
      if(!tel){
         Alert.alert('연락처를 입력해주세요.');
         return false;
      }
      let formdata = new FormData();

      formdata.append('phone', tel);
      axios
        .post('http://bangb.zone/api/sms_send', formdata, {
         headers: {
           Accept: 'application/json',
           'Content-Type': 'multipart/form-data',
         },
        })
       .then(response => {
         if (response.data.result === 1) {
           setIsCerti(!certi);
         } else {
           Alert.alert(response.data.msg);
         }
       })
       .catch(e => {
         console.log(e.message);
         Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
       });
  }

  const Check_certi_number = () => {
      if(!tel){
         Alert.alert('연락처를 입력해주세요.');
         return false;
      }else if(!certi){
         Alert.alert('인증번호 6자리를 입력해주세요.');
         return false;
      }

      let formdata = new FormData();

      formdata.append('phone', tel);
      formdata.append('certi_number', certi);

      axios
        .post('http://bangb.zone/api/check_certi_number', formdata, {
         headers: {
           Accept: 'application/json',
           'Content-Type': 'multipart/form-data',
         },
        })
       .then(response => {
         if (response.data.result === 1) {
           Alert.alert('인증되었습니다.');
           setIsDisabled(!isDisabled);
         } else {
           Alert.alert(response.data.msg);
         }
       })
       .catch(e => {
         console.log(e.message);
         Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
       });
  }

  return (
        <Container>
          <Body>
            <MainText>아이디를 찾기 위해{'\n'}필요한 정보들을 입력해주세요.</MainText>
            <HeaderTextPattern/>

            <ImportantWarp>
              <Important>•</Important>
              <HelpText> 개인 연락처</HelpText>
            </ImportantWarp>

            <TelWarp>
              <CommonTextInput
                placeholder = {'연락처'}
                maxLength={11}
                value={tel}
                onChangeText={onTelHandler}
                style={[{width:'60%'}]}
                editable = {!isDisabled}
              />
              <CertifiBtn
                onPress = { () => Send_sms() }
                disabled = {isDisabled}>
                  <BtnText>인증받기</BtnText>
              </CertifiBtn>
            </TelWarp>

          { isCerti == true ?
            <TelWarp>
              <CommonTextInput
                placeholder = {'인증번호6자리'}
                maxLength={6}
                value={certi}
                onChangeText={onCertiHandler}
                style={[{width:'60%'}]}
                editable = {!isDisabled}
              />
              <CertifiBtn
                onPress = { () => Check_certi_number() }
                disabled = {isDisabled}
              >
                  <BtnText>인증</BtnText>
              </CertifiBtn>
            </TelWarp>
            :
            null
          }
            <SubmitBtn onPress = { () => SubmitAction() }>
              <BtnText>확인</BtnText>
            </SubmitBtn>
          </Body>
        </Container>
  );
};

export default SearchIdScreen;
