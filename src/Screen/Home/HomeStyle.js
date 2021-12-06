import styled from 'styled-components';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: #FBFBFB 0% 0% no-repeat padding-box;
`;

export const Body = styled.ScrollView`
  background: #FBFBFB 0% 0% no-repeat padding-box;
`;


// 로그인 후 (시작)

export const RealLoginWarp = styled.View`
  flex: 1;
`;

export const TopWarp = styled.ImageBackground`
    height: 175px;
    margin-top: -37px;
    padding: 20px 25px;
`;

export const SpacingView = styled.ImageBackground`
    width: 100%;
    height: 180px;
    padding: 50px 50px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 16px;
`;

export const SpacingText = styled.Text`
    color: #6a6a6a;
    font-size: 18px;
`;

export const ModalCloseWarp = styled.TouchableOpacity`
  width:50px;
  height:50px;
  border-radius: 50px;
  background: white;
  z-index: 999;
  margin-bottom: 10px;
`;

export const ModalCloseImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;

export const GearingWarp = styled.View`
    width: 100%;
`;

export const Gearing = styled.Image`
  width:100%;
`;

export const SpacingText2 = styled.Text`
    color: white;
    font-size: 16px;  
    font-weight: bold;
`;

export const GoWayWarp = styled.TouchableOpacity`
    width: 120px;
    height: 50px;
    border-radius: 20px;
    background: white;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
`;

export const GoWayText = styled.Text`
    color: black;
    font-size: 18px;
    font-weight: bold;
`;

export const WeatherWarp = styled.View`
    display: flex;
    height: 70px;
    padding-top: 30px;
    flex-direction: row;
    align-items: center;
`;

export const AddressIcon = styled.Image`
   margin-left: -20px;
   width: 30px;
`;

export const AddressWarp = styled.View`
    background: white;
    border-radius: 25px;
    width: 60%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const AddressText = styled.Text`
    color: #3D4F82;
    font-size: 14px;
`;

export const WeatherBox = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const WeatherIcon = styled.Image`
  width: 35px;
  margin: 0 20px;
`;

export const SidoWeatherWarp = styled.View`
    display: flex;
    height: 68px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: -10px;
`;

export const WeatherText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const NuriSourceImgWarp = styled.View`
  justify-content: flex-end;
  flex: 1;
`;

export const NuriSourceImg = styled.Image`
    width: 40%;
    margin-top: -70px;
`;

export const WeatherBoldText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin-left: -30px;
`;


export const BottomWarp = styled.View`
  flex: 1;
  width: 100%;
  padding: 20px 20px 30px 20px;
  background: #f7f7f7;
  margin-top: -36px;
`;

export const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#c5deff',
    borderRadius: 5,
    height: 45,
    width: '100%',
    color: '#1978F3',
    paddingRight: 30,
    backgroundColor: 'white'
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#c5deff',
    borderRadius: 5,
    width: '100%',
    height: 45,
    color: '#1978F3',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'white'
  },
});

export const InsideWeatherWarp = styled.View`
  flex: 1;
  width: 100%;
  height: 90px;
  padding: 10px 0px;
  background: #FFFFFF;
  border-radius: 15px;
  border: 1px solid #eee;
  flex-direction: row;
`;

export const InsideWeatherBox = styled.View`
  width: 33.3%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BlueText = styled.Text`
  color: #3D4F82;
  font-size: 16px;
  font-weight: 800;
`;

export const BlackText = styled.Text`
  color: black;
  margin-top: 5px;
  font-size: 16px;
  font-weight: 400;
`;

export const SubTitle = styled.Text`
  color: #3D4F82;
  font-size: 14px;
  font-weight: bold;
  margin: 15px 0px 5px 6px;
`;

export const InsideAirWarp = styled.View`
  flex: 1;
  width: 100%;
  height: 150px;
  padding: 20px 0px;
  background: #FFFFFF;
  border-radius: 15px;
  border: 1px solid #eee;
  flex-direction: column;
`;


export const NulldataWarp = styled.View`
    width: 100%;
    height: 100%;
    opacity: 0.4;
    justify-content: center;
    align-items: center;
`;

export const Nulldata = styled.Text`
  color: gray;
  font-size: 18px;
  font-weight: bold;
`;

export const AirStatusWarp = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const AirStatusIcon = styled.Image`
  width: 35px;
`;

export const AirStatusText = styled.Text`
  color: black;
  font-weight: 500;
  margin-left: 10px;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
`;

export const DirectionColumn = styled.View`
  flex-direction: column;
  width: 48%;
  height: 70px;
`;

export const EmergencyWarp = styled.View`
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  border-radius: 15px;
  border: 1px solid #eee;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
`;

export const EmergencyIcon = styled.Image`
  margin-top: 3px;
  margin-left: -30px;
`;

export const NullTextWarp = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const NullText = styled.Text`
`;

export const EmergencyText = styled.Text`
  color: black;
  font-size: 15px;
  font-weight: 400;
  margin-left: -3px;
`;

// 로그인 후 (끝)
