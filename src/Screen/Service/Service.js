
import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {HeaderBackScreen} from '../Header/Header';

import{
    Container,
    Body,
    TouchMenuWarp,
    TouchMenu,
    TouchMenuActiveText,
    TouchMenuText,
    MainText
} from './ServiceStyle';


const ServiceScreen = ({navigation}) => {

  const [page, setPage] = useState(1);

  return (
      <Container>      
        <HeaderBackScreen navigation={navigation} />
        <Body>
          <TouchMenuWarp>
            <TouchMenu onPress={() => setPage(1)}>
              { page == 1? <TouchMenuActiveText>개인정보처리방침</TouchMenuActiveText> : <TouchMenuText>개인정보처리방침</TouchMenuText> }
            </TouchMenu>
            <TouchMenu onPress={() => setPage(2)}>
              { page == 2? <TouchMenuActiveText>이용약관</TouchMenuActiveText> : <TouchMenuText>이용약관</TouchMenuText> }
            </TouchMenu>
          </TouchMenuWarp>
          <MainText>
            { page == 1? '개인정보처리방침' : '이용약관' }
          </MainText>
        </Body>
      </Container>
  );
};

export default ServiceScreen;
