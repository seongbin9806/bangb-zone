
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
    CommonTextInput,
    SubmitBtn,
    BtnText
} from './ChangePwdStyle';

const ChangePwdScreen = ({navigation, route}) => {

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const onPasswordHandler = text => {
    setPassword(text);
  };

  const onPasswordCheckHandler = text => {
    setPasswordCheck(text);
  };

  const SubmitAction = () => {

    if(!password){
      Alert.alert('비밀번호를 입력해주세요.');
      return false;
    }else if(!passwordCheck){
      Alert.alert('비밀번호 재확인을 입력해주세요.');
      return false;
    }else if(password != passwordCheck){
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    let formdata = new FormData();
    let id = route.params.params.id;

    formdata.append('id', id);
    formdata.append('pwd', password);

    axios
      .post('http://bangb.zone/api/member_change_pwd', formdata, {
       headers: {
         Accept: 'application/json',
         'Content-Type': 'multipart/form-data',
       },
      })
     .then(response => {
       if (response.data.result === 1) {
         Alert.alert('변경되었습니다.');
         navigation.navigate('Login');
       } else {
         Alert.alert(response.data.msg);
       }
     })
     .catch(e => {
       Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
     });
  }

  return (
      <Container>
        <Body>
          <MainText>비밀번호 변경을 위해{'\n'}필요한 정보들을 입력해주세요.</MainText>
          <HeaderTextPattern/>

          <ImportantWarp>
            <Important>•</Important>
            <HelpText> 비밀번호</HelpText>
          </ImportantWarp>
          <CommonTextInput
            type="password"
            placeholder = {'비밀번호'}
            secureTextEntry={true}
            value={password}
            onChangeText={onPasswordHandler}
          />

          <ImportantWarp>
            <Important>•</Important>
            <HelpText> 비밀번호 재확인</HelpText>
          </ImportantWarp>
          <CommonTextInput
            type="password"
            placeholder = {'비밀번호 재확인'}
            secureTextEntry={true}
            value={passwordCheck}
            onChangeText={onPasswordCheckHandler}
          />

          <SubmitBtn onPress = { () => SubmitAction() }>
            <BtnText>확인</BtnText>
          </SubmitBtn>
        </Body>
      </Container>
  );
};

export default ChangePwdScreen;
