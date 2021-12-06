import React, {useState, useRef, useEffect, useCallback} from 'react';
import { Alert, Platform, BackHandler, Dimensions  } from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {login, setLogedin} from '../../Store/actions/userAction';
import {useNavigationState} from '@react-navigation/core';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-easy-toast';

const Container = styled.ScrollView`
  flex:1;
  width: 100%;
  height: 100%;
`;

const IntroImage = styled.ImageBackground`
    width: 100%;
    height: 910px;
`;

const Title = styled.Text`
  margin-top: 50px;
  margin-left: 30px;
  color: #1B274C;
  font-size: 23px;
  line-height: 30px;
  font-family: 'BMJUA_ttf';
`;

const SubTitle = styled.Text`
  margin-top: 30px;
  margin-left: 30px;
  color: #1B274C;
  opacity: 0.7;
  font-size: 18px;
  font-family: 'BMJUA_ttf';
`;

const Body2 = styled.ImageBackground`
  padding: 30px 20px;
  margin-top: -230px;
`;

const FixBtn = styled.TouchableOpacity`
    margin-top: 20px;
    margin-left: 10px;
    width: 60%;
    height: 70px;
    border-radius: 3px;
    justify-content: center;
    padding-left: 20px;
    background: #1B274C;
    position: absolute;
    z-index: 5;
    top: 50px;
    right: 0;
`;

const GoBtn = styled.TouchableOpacity`
    margin-top: 20px;
    margin-left: 10px;
    width: 95%;
    height: 70px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    padding-left: 20px;
    background: #1B274C;
`;

const GoBtnTextWarp = styled.View`
  flex-direction: row;
  position: relative;
`;

const GoBtnText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 18px;
  font-family: 'BMJUA_ttf';
`;

const ArrawImage = styled.Image`
  margin-top: 4px;
  position: absolute;
  right: 20px;
`;

const IntroScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const {routes} = useNavigationState(state => state);
  const toastRef = useRef(); // toast ref 생성
  const [scrollTop, setScrollTop] = useState(0); // fixBTn

  var currentCount = 0;

  useEffect(() => {
    const backAction = () => {
      let screenName = '';

      if(routes.length >= 1){
          screenName = routes[routes.length - 1].name;
      }

      if (screenName === 'Intro') { // 안드로이드 뒤로가기 버튼 제어

        if (currentCount === 0) {
           toastRef.current.show('한번 더 누르면 앱을 종료합니다.');
           currentCount++;
          } else {
            BackHandler.exitApp();
          }

         setTimeout(() => {
           currentCount = 0;
         }, 1000);

         return true;

      } else {
        navigation.goBack();
      }

      return true;
    };

    const action = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => action.remove();
  }, [routes]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SplashScreen.hide();
      checkAutoLogin();
    });
    return unsubscribe;
  }, []);

  const checkAutoLogin = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');

      if (userData !== null) {
        let data = JSON.parse(userData);

        if (data.token == true && data.id !== null) {
          dispatch(login(userData));
          dispatch(setLogedin(true));
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [navigation]);

  return (
    <Container
      onScroll={(event) => {
          setScrollTop(event.nativeEvent.contentOffset.y);          
      }}
    >
      <Toast ref={toastRef}
         positionValue={ (100 - scrollTop)}
         fadeInDuration={200}
         fadeOutDuration={1000}
         style={{backgroundColor:'rgba(33, 87, 243, 0.5)'}}
      />

      <FixBtn
        onPress={() => navigation.navigate('Login')}
        style={{top: (scrollTop + 160)}}>
        <GoBtnTextWarp>
          <GoBtnText>회원가입 및 로그인</GoBtnText>
          <ArrawImage
            source={require('../../Assets/Image/Intro/btn_arrow.png')}
            style={{resizeMode: 'contain'}}
          />
        </GoBtnTextWarp>
      </FixBtn>

      <IntroImage source={require('../../Assets/Image/Intro/intro_1.png')} resizeMode="contain">
        <Title>
          방비존은 간편하게{'\n'}
          실내 온습도, 화재, 침입상태를{'\n'}
          모니터링 할 수 있는{'\n'}
          Solution Platform.
        </Title>
      </IntroImage>
      <IntroImage
        source={require('../../Assets/Image/Intro/intro_2.png')}
        resizeMode="contain"
        style={{height: 820}}
      />
      <IntroImage
        source={require('../../Assets/Image/Intro/intro_3.png')}
        resizeMode="contain"
        style={{height: 800}}
      />
      <Body2>

        <GoBtn style={{backgroundColor: '#A9ADBB'}} onPress={() => navigation.navigate('question')}>
          <GoBtnTextWarp>
            <GoBtnText>견적 상담 및 문의</GoBtnText>
            <ArrawImage
              source={require('../../Assets/Image/Intro/btn_arrow.png')}
              style={{ marginLeft: 40, resizeMode: 'contain'}}
            />
          </GoBtnTextWarp>
        </GoBtn>
      </Body2>
    </Container>
  );
};

export default IntroScreen;
