import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Alert, Platform, BackHandler } from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Container = styled.View`
  flex: 1;
  width: 100%;
  background: white;
`;

const Body = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

const Header = styled.View`
  width: 100%;
  height: 80px;
  background: #1B274C;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
`;

const SensorImageWarp = styled.View`
  width: 100%;
`;

const SensorImage = styled.Image`
  width: 100%;
`;

const PriceTextWarp = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const MonthText = styled.Text`
  color: #1B274C;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
  margin-right: 5px;
`;

const PriceText = styled.Text`
  color: #1B274C;
  font-size: 24px;
  font-weight: bold;
`;

const PriceSubTextWarp = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
`;

const PriceSubText = styled.Text`
  color: #B5B9C8;
  font-size: 18px;
`;

export const PolicyWarp = styled.View`
  flex-direction: row;
  flex: 1;
  margin-top: 30px;
  margin-left: 10px;
  align-items: center;
  justify-content: space-between;
`;

export const MovePolicy = styled.Text`
  color: gray;
  text-decoration-line: underline;
`;

const GoBtn = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  margin: 30px 0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  background: #A9ADBB;
  justify-content: center;
  align-items: center;
`;

const GoBtnText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const CardAddIntroScreen = ({navigation}) => {

  // const [isDisabled, setIsDisabled] = useState(true);

  return (
    <Container>
      <Header style={{marginTop: Platform.OS === 'ios' ? 33 : 0}}>
          <HeaderText>이용료 결제</HeaderText>
      </Header>
      <Body>
        <SensorImageWarp>
          <SensorImage
            source={require('../../Assets/Image/Intro/sensor_robot.png')}
            style={{resizeMode: 'contain'}}
          />
        </SensorImageWarp>

        <PriceTextWarp>
          <MonthText>월</MonthText>
          <PriceText>₩9,900</PriceText>
        </PriceTextWarp>
        <PriceSubTextWarp>
          <PriceSubText>(VAT 포함)</PriceSubText>
        </PriceSubTextWarp>

{/*
        <PolicyWarp>
          <BouncyCheckbox
            size={18}
            onPress={() => setIsDisabled(!isDisabled)}
            fillColor="#4c60a7"
            text="약관에 동의합니다"
          />
          <MovePolicy>보기</MovePolicy>
        </PolicyWarp>
*/}
        <GoBtn
          //disabled = {isDisabled}
          onPress={() => {
              navigation.navigate('CardAdd', { screen: 'CardAdd', params: {type: 'main'}});
          }}>
          <GoBtnText>다음</GoBtnText>
        </GoBtn>
      </Body>
    </Container>
  );
};

export default CardAddIntroScreen;
