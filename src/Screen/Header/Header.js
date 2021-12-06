import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import {DrawerActions} from '@react-navigation/routers';
import {Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {
  HeaderWrap,
  GoBackWrap,
  GoBackImage,
  HeaderText,
  MenuWrap,
  MenuImage,
  LogoWrap,
  LogoWrap2,
  MenuWrap2,
  LogoImage,
  BellWrap,
  BellImage,
  BellCountWarp,
  BellCount,
} from './HeaderStyle';

const HeaderScreen = ({navigation}) => {

  const [alermCount, setAlermCount] = useState(0);

  useLayoutEffect(() => {
      setNoticeCount();
  }, []);

  const setNoticeCount = useCallback(async () => {
    const userData = await AsyncStorage.getItem('userData');

    if (userData !== null) {
      let data = JSON.parse(userData);
      let formdata = new FormData();

      formdata.append('id', data.id);

      axios
        .post('http://bangb.zone/api/get_member_notice_count', formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response.data.result === 1) {
            setAlermCount(response.data.alerm_count);
          } else {
            Alert.alert(...response.data.msg);
          }
        })
        .catch(e => {
          Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
        });
    } else {
      Alert.alert('로그인 세션이 만료되었습니다.');
      navigation.navigate('Login');
    }
  }, [navigation]);

  return (
    <HeaderWrap
      stickyHeaderIndices={[0]}
      style={{marginTop: Platform.OS === 'ios' ? 33 : 0}}>
      <MenuWrap onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <MenuImage
          source={require('../../Assets/Image/menu.png')}
          style={{resizeMode: 'contain'}}
        />
      </MenuWrap>
      <LogoWrap onPress={() => navigation.navigate('stack', {screen: 'Main'})}>
        <LogoImage
          source={require('../../Assets/Image/logo.png')}
          style={{resizeMode: 'contain'}}
        />
      </LogoWrap>

      <BellWrap
        onPress={() => navigation.navigate('stack', {screen: 'MemberNotice'})}>
        <BellImage
          source={require('../../Assets/Image/bell.png')}
          style={{resizeMode: 'contain'}}
        />
        <BellCountWarp>
          <BellCount>{alermCount}</BellCount>
        </BellCountWarp>
      </BellWrap>
    </HeaderWrap>
  );
};

export const HeaderBackScreen = ({navigation}) => {
  return (
    <HeaderWrap
      stickyHeaderIndices={[0]}
      style={{marginTop: Platform.OS === 'ios' ? 33 : 0}}>
      <GoBackWrap onPress={() => navigation.goBack()}>
        <GoBackImage source={require('../../Assets/Image/arr_lef02.png')} />
      </GoBackWrap>

      <LogoWrap2 onPress={() => navigation.navigate('stack', {screen: 'Main'})}>
        <LogoImage
          source={require('../../Assets/Image/logo.png')}
          style={{resizeMode: 'contain'}}
        />
      </LogoWrap2>

      <MenuWrap2
        onPress={() => navigation.dispatch(DrawerActions.openDrawer()) }>        
        <MenuImage
          source={require('../../Assets/Image/menu.png')}
          style={{resizeMode: 'contain'}}
        />
      </MenuWrap2>
    </HeaderWrap>
  );
};

export default HeaderScreen;
