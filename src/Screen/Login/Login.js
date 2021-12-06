import React, {useState, useEffect, useCallback} from 'react';
import {login, setLogedin} from '../../Store/actions/userAction';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

import {
  Container,
  LogoWarp,
  LogoImg,
  LoginInputwarp,
  EmailWarp,
  PwdWarp,
  SwtichBarWarp,
  SwtichWarp,
  SwtichBar,
  SwtichBarText,
  SearchPwdWarp,
  SearchPwd,
  SubmitLogin,
  LoginText,
  SocialTextWarp,
  SocialText,
  SocialWarp,
  SocialTouchWarp,
  SocialImage,
  JoinWarp,
  JoinHelpText,
  JoinText,
} from './LoginStyle';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [autoLogin, setAutoLogin] = useState(true);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [deviceToken, setDeviceToken] = useState('');

  const onIdHandler = text => {
    setId(text);
  };

  const onPasswordHandler = text => {
    setPassword(text);
  };

  const isAutoHandler = () => {
    setAutoLogin(!autoLogin);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFcmToken();
      // setId('');
      // setPassword('');
      // checkAutoLogin();
    });
    return unsubscribe;
  }, []);

  const getFcmToken = useCallback(async () => {
    const device_token = await messaging().getToken();
    setDeviceToken(device_token);
  }, [dispatch]);

  const LoginSubmit = () => {
    if (!id) {
      Alert.alert('아이디를 입력해주세요.');
      return false;
    } else if (!password) {
      Alert.alert('비밀번호를 입력해주세요.');
      return false;
    }

    let formdata = new FormData();

    formdata.append('id', id);
    formdata.append('pwd', password);
    formdata.append('device_token', deviceToken);
    formdata.append('device_type', Platform.OS);

    axios
      .post('http://bangb.zone/api/member_login', formdata, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response.data.result === 1) {
          let data = {token: autoLogin, id: id, device_token: deviceToken};

          AsyncStorage.setItem('userData', JSON.stringify(data));
          dispatch(login(data));
          dispatch(setLogedin(true));
          // navigation.navigate('Main');
        } else {
          Alert.alert(response.data.msg);
        }
      })
      .catch(e => {
        console.log(e);
        Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
      });
  };

  return (
    <Container>
      <LogoWarp>
        <LogoImg
          source={require('../../Assets/Image/logo.png')}
          style={{resizeMode: 'contain'}}
        />
      </LogoWarp>
      <LoginInputwarp>
        <EmailWarp
          placeholder="아이디를 입력하세요"
          value={id}
          onChangeText={onIdHandler}
        />
        <PwdWarp
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChangeText={onPasswordHandler}
          type="password"
          secureTextEntry={true}
        />
      </LoginInputwarp>
      <SwtichWarp>
        <SwtichBarWarp value={autoLogin} onPress={isAutoHandler}>
          <SwtichBar
            source={
              autoLogin == true
                ? require('../../Assets/Image/auto_active.png')
                : require('../../Assets/Image/auto_none.png')
            }
            style={{resizeMode: 'contain'}}
          />
        </SwtichBarWarp>
        <SwtichBarText>자동로그인</SwtichBarText>
        <SearchPwdWarp onPress={() => navigation.navigate('SearchPwd')}>
          <SearchPwd> 계정 찾기</SearchPwd>
        </SearchPwdWarp>
      </SwtichWarp>
      <SubmitLogin onPress={() => LoginSubmit()}>
        <LoginText>로그인</LoginText>
      </SubmitLogin>

      {/*
      <SocialTextWarp>
        <SocialText>SNS 계정으로 간편하게 로그인 하세요!</SocialText>
      </SocialTextWarp>

      <SocialWarp>
        <SocialTouchWarp>
          <SocialImage
            source={require('../../Assets/Image/sns-apple.png')}
            style={{resizeMode: 'contain'}}
          />
        </SocialTouchWarp>
        <SocialTouchWarp>
          <SocialImage
            source={require('../../Assets/Image/sns-kakao.png')}
            style={{resizeMode: 'contain'}}
          />
        </SocialTouchWarp>
        <SocialTouchWarp>
          <SocialImage
            source={require('../../Assets/Image/sns-naver.png')}
            style={{resizeMode: 'contain'}}
          />
        </SocialTouchWarp>
      </SocialWarp>
      */}
      <JoinWarp
        style={[{marginBottom: Platform.OS === 'ios' ? 100 : 50}]}
        onPress={() => navigation.navigate('Join')}>
        <JoinText>회원가입</JoinText>
      </JoinWarp>
    </Container>
  );
};

export default LoginScreen;
