
import React, { useState } from 'react';
import {Alert, Platform} from 'react-native';
import axios from 'axios';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import{
    Container,
    Body,
    MainText,
    HeaderTextPattern,
    ImportantWarp,
    Important,
    HelpText,
    PolicyWarp,
    Row,
    CertifiBtn,
    CommonTextInput,
    NormalText,
    MovePolicyWarp,
    MovePolicy,
    SubmitJoin,
    BtnText
} from './JoinStyle';

const JoinScreen = ({navigation}) => {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setname] = useState('');
  const [tel, setTel] = useState('');
  const [certi, setCerti] = useState('');
  const [isCerti, setIsCerti] = useState(false);
  const [isIdDisabled, setIsIdDisabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);

  const onIdHandler = text => {
    setId(text);
  };

  const onPasswordHandler = text => {
    setPassword(text);
  };

  const onPasswordCheckHandler = text => {
    setPasswordCheck(text);
  };

  const onNameHandler = text => {
    setname(text);
  };

  const onTelHandler = text => {
    setTel(text);
  };

  const onCertiHandler = text => {
    setCerti(text);
  };

  const JoinSubmit = () => {

    if(isIdDisabled === false){
      Alert.alert('아이디 중복확인을 해주세요.');
      return false;
    }else if(!id){
      Alert.alert('아이디를 입력해주세요.');
      return false;
    }else if(!password){
      Alert.alert('비밀번호를 입력해주세요.');
      return false;
    }else if(!passwordCheck){
      Alert.alert('비밀번호 재확인을 입력해주세요.');
      return false;
    }else if(password != passwordCheck){
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return false;
    }else if(!name){
      Alert.alert('이름을 입력해주세요.');
      return false;
    }else if(!tel){
       Alert.alert('연락처를 입력해주세요.');
       return false;
    }else if(!certi){
      Alert.alert('연락처를 인증해주세요.');
      return false;
    }else if(!toggleCheckBox1){
      Alert.alert('이용약관에 동의해주세요.');
      return false;
    }

    let formdata = new FormData();

    formdata.append('id', id);
    formdata.append('pwd', password);
    formdata.append('name', name);
    formdata.append('phone', tel);
    formdata.append('certi_number', certi);

    axios
      .post('http://bangb.zone/api/member_join', formdata, {
       headers: {
         Accept: 'application/json',
         'Content-Type': 'multipart/form-data',
       },
      })
     .then(response => {

       if (response.data.result === 1) {
         Alert.alert('회원가입이 완료되었습니다.');
         navigation.navigate('Login');
       } else {
         Alert.alert(response.data.msg);
       }
     })
     .catch(e => {
       Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
     });
  }


  const Check_id = () => {

    if(!id){
      Alert.alert('아이디를 입력해주세요.');
      return false;
    }

    let formdata = new FormData();

    formdata.append('id', id);
    axios
    .post('http://bangb.zone/api/check_id', formdata, {
       headers: {
         Accept: 'application/json',
         'Content-Type': 'multipart/form-data',
       },
      })
     .then(response => {
       if (response.data.result === 1) {
         setIsIdDisabled(!isIdDisabled);
         Alert.alert('사용할 수 있는 아이디입니다.');
       } else {
         Alert.alert(response.data.msg);
       }
     })
     .catch(e => {
       console.log(e.message);
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
            <MainText>회원가입을 위해{'\n'}필요한 정보들을 입력해주세요.</MainText>
            <HeaderTextPattern/>

            <ImportantWarp>
              <Important>•</Important>
              <HelpText> 아이디</HelpText>
            </ImportantWarp>
            <Row>
              <CommonTextInput
                placeholder = {'아이디'}
                value={id}
                onChangeText={onIdHandler}
                editable = {!isIdDisabled}
                style={[{width:'60%'}]}
              />
              <CertifiBtn
                onPress = { () => Check_id() }
                disabled = {isIdDisabled}>
                <BtnText>중복확인</BtnText>
              </CertifiBtn>
            </Row>

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

            <ImportantWarp>
              <Important>•</Important>
              <HelpText> 이름</HelpText>
            </ImportantWarp>
            <CommonTextInput
              placeholder = {'이름'}
              value={name}
              onChangeText={onNameHandler}
            />

            <ImportantWarp>
              <Important>•</Important>
              <HelpText> 개인 연락처</HelpText>
            </ImportantWarp>

            <Row>
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
            </Row>

          { isCerti == true ?
            <Row>
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
            </Row>
            :
            null
          }
            <PolicyWarp>
              <BouncyCheckbox
                size={16}
                isChecked={toggleCheckBox1}
                fillColor="#4c60a7"
                text="이용약관에 동의합니다."
                onPress={() => setToggleCheckBox1(!toggleCheckBox1)}
                style={{width:'80%'}}
              />
              <MovePolicyWarp onPress={() => navigation.navigate('JoinAgree1')}>
                <MovePolicy>보기</MovePolicy>
              </MovePolicyWarp>
            </PolicyWarp>

            <SubmitJoin style={[{marginBottom:Platform.OS === 'ios'? 70 : 30}]} onPress = { () => JoinSubmit() }>
              <BtnText>회원가입</BtnText>
            </SubmitJoin>
          </Body>
        </Container>
  );
};

export default JoinScreen;
