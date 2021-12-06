import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background: #fbfbfb;
`;

export const Body = styled.ScrollView`
  padding: 0px 20px;
  padding-top: 30px;
  height: 100%;
`;

export const DeviceAddWarp = styled.TouchableOpacity`
  background: #4c60a7;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
`;

export const DeviceAddText = styled.Text`
  font-size: 16px;
  font-family: 'BMJUA_ttf';
  color: white;
`;

export const DeviceListBox = styled.View`
  margin-bottom: 70px;
`;

export const DeviceListWarp = styled.TouchableOpacity`
  height: 110px;
  display: flex;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
  margin-bottom: 15px;
  background: #ffffff;
  border-radius: 20px;
  padding: 0 10px;
  border: 1px solid #eee;
`;


export const DeviceListTextWarp = styled.View`
  height: 20px;
  flex-direction: row;
  margin-top: 20px;
`;

export const DeviceName = styled.Text`
  font-family: 'BMJUA_ttf';
  font-size: 17px;
  padding-left: 10px;
  letter-spacing: -1px;
`;

export const AddressText = styled.Text`
  font-weight: 600;
  font-family: 'BMJUA_ttf';
  font-size: 15px;
  padding-left: 13px;
  letter-spacing: -0.5px;
`;

export const AddressDerailText = styled.Text`
  padding-left: 12px;
  color: gray;
  font-size: 16px;
  font-family: 'BMJUA_ttf';
  letter-spacing: -0.5px;
`;


export const DeviceOrderTextWarp = styled.View`
  width: 20px;
  height: 20px;
  background: #333333;
  border-radius: 25px;
  padding-top: 3px;
`;

export const DeviceOrderText = styled.Text`
  font-weight: bold;
  color: white;
  text-align: center;
  font-size: 10px;
`;

export const DeviceImage = styled.Image`
  width: 18px;
  height: 100%;
  margin-left: 10px;
`;

export const DeviceText = styled.Text`
  margin-left: 20px;
  font-size: 12px;
  font-weight: bold;
`;

export const MoreImageWarp = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  display: flex;
  position: absolute;
  right: 0;
`;

export const MoreImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const GearingWarp = styled.View`
  margin-top: 25px;
  width: 100%;
`;

export const Gearing = styled.Image`
  width:100%;
`;
