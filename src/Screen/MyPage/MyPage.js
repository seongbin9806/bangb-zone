
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
    MainText,
    HeaderTextPattern,
    ImportantWarp,
    Important,
    HelpText,
    PolicyWarp,
    TelWarp,
    CommonTextInput,
    NormalText,
    MovePolicy,
    SubmitUpdate,
    UpdateText,
    CertifiBtn,
    BtnText
} from './MyPageStyle';


const MyPageScreen = ({navigation}) => {

  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [placeholderTel, setPlaceholderTel] = useState('');
  const [certi, setCerti] = useState('');
  const [isCerti, setIsCerti] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [memberInfo, setMemberInfo] = useState({});

  const onTelHandler = text => {
    setTel(text);
  };

  const onPasswordHandler = text => {
    setPassword(text);
  };

  const onPasswordCheckHandler = text => {
    setPasswordCheck(text);
  };

  const onNameHandler = text => {
    setName(text);
  };

  const onCertiHandler = text => {
    setCerti(text);
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
        let formdata = new FormData();

        setUserId(data.id);
        formdata.append('id', data.id);

        axios.post('http://bangb.zone/api/get_my_info', formdata, {
           headers: {
             Accept: 'application/json',
             'Content-Type': 'multipart/form-data',
           },
          })
          .then(response => {
            if (response.data.result === 1) {
              setUserId(data.id);
              setName(response.data.list.member_name);
              setPlaceholderTel(response.data.list.phone);
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

  const UpdateSubmit = () => {
     if((password || passwordCheck) && (password != passwordCheck)){
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return false;
    }else if(!name){
      Alert.alert('이름을 입력해주세요.');
      return false;
    }

    let formdata = new FormData();

    console.log(isDisabled);

    formdata.append('id', userId);
    formdata.append('member_name', name);
    formdata.append('phone', tel);
    formdata.append('is_disabled', isDisabled? '1' : '0');
    formdata.append('pwd', password);

    axios.post('http://bangb.zone/api/member_update', formdata, {
       headers: {
         Accept: 'application/json',
         'Content-Type': 'multipart/form-data',
       },
      })
     .then(response => {

       if (response.data.result === 1) {
         Alert.alert('변경되었습니다.');
         setPassword('');
         setPasswordCheck('');
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
          <HeaderBackScreen navigation={navigation} />
          <Body>
              <Loader/>
              <>
               <MainText>정보변경을 위해{'\n'}필요한 정보들을 입력해주세요.</MainText>
               <HeaderTextPattern/>

               <ImportantWarp>
                 <Important>⦁</Important>
                 <HelpText> 아이디</HelpText>
               </ImportantWarp>
               <CommonTextInput
                 value={userId}
                 editable = {false}
               />

               <ImportantWarp>
                 <Important>⦁</Important>
                 <HelpText> 이름</HelpText>
               </ImportantWarp>
               <CommonTextInput
                 placeholder = {'이름을 입력해주세요'}
                 value={name}
                 onChangeText={onNameHandler}
               />

               <ImportantWarp>
                 <HelpText>개인 연락처</HelpText>
                 <Important> (연락치 변경 할 시 인증)</Important>
               </ImportantWarp>

               <TelWarp>
                 <CommonTextInput
                   placeholder = {placeholderTel}
                   maxLength={11}
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
              <ImportantWarp>
                <HelpText>비밀번호</HelpText>
                <Important> (비밀번호 변경 할 시 입력)</Important>
               </ImportantWarp>
              <CommonTextInput
                type="password"
                placeholder = {'비밀번호를 다시 한 번 입력해주세요'}
                secureTextEntry={true}
                value={password}
                onChangeText={onPasswordHandler}
              />

               <ImportantWarp>
                 <HelpText>비밀번호 재확인</HelpText>
                 <Important> (비밀번호 변경 할 시 입력)</Important>
               </ImportantWarp>
               <CommonTextInput
                 type="password"
                 placeholder = {'비밀번호를 다시 한 번 입력해주세요'}
                 secureTextEntry={true}
                 value={passwordCheck}
                 onChangeText={onPasswordCheckHandler}
               />

               <SubmitUpdate onPress = { () => UpdateSubmit() }>
                 <UpdateText>변경하기</UpdateText>
               </SubmitUpdate>
             </>
          </Body>
        </Container>
    );
};

export default MyPageScreen;
