import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: #fbfbfb;
`;

export const Body = styled.ScrollView`
  padding: 30px 30px;
`;

export const DeviceAddWarp = styled.TouchableOpacity`
  background: #4c60a7;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  height: 50px;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const DeviceAddText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: white;
`;

export const MainText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  letter-spacing: -1px;
`;

export const HeaderTextPattern = styled.View`
  position: absolute;
  top: 10px;
  left: 0px;
  width: 70px;
  height: 16px;
  background: #1978f3 0% 0% no-repeat padding-box;
  opacity: 0.15;
`;

export const ImportantWarp = styled.Text`
  flex-direction: row;
  flex: 1;
  margin-top: 20px;
`;

export const Important = styled.Text`
  color: red;
`;

export const HelpText = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 14px;
`;

export const PolicyWarp = styled.View`
  flex-direction: row;
  flex: 1;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const NormalText = styled.Text`
  flex:2;
  padding-left: 3px;
  font-size: 12px;
`;

export const MovePolicy = styled.Text`
  color: gray;
  text-decoration-line: underline;
`;

export const CommonTextInput = styled.TextInput`
  width: 100%;
  height: 45px;
  border: 0;
  opacity: 1;
  padding: 10px;
  padding-left: 10px;
  color: gray;
  margin-top: 10px;
  font-weight: bold;
  border: 2px solid #eee;
  background: white;
`;


export const AddressWarp = styled.TouchableOpacity`
  position: relative;
`;


export const AddressSearchBtn = styled.View`
  background: #4c60a7;
  align-items: center;
  border-radius: 5px;
  width: 35%;
  height: 43px;
  justify-content: center;
  position: absolute;
  top: 51px;
  right: 0;
`;

export const AddressText = styled.Text`
  color: white;
  font-weight: bold;
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


export const ModalContainer = styled.View`
  flex: 1;
  background: white;
  width: 100%;
  height: 100%;
`;

export const AppListWarp = styled.ScrollView`
`;

export const AppInfoWarp = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;

export const AppIcon = styled.Image`
  width: 80px;
  height: 40px;
`;

export const AppName = styled.Text`
  color: black;
  font-size: 16px;
  font-family: 'BMJUA_ttf';
`;
