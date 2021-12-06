import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: white;
`;

export const Header = styled.View`
  width: 100%;
  height: 80px;
  background: #1B274C;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const GoBackWrap = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  padding-left: 30px;
`;

export const GoBackImage = styled.Image``;

export const HeaderWarp = styled.View`
  flex-direction: row;
`;

export const HeaderText = styled.Text`
  display: flex;
  flex: 2;
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin-left: -5px;
`;

export const Body = styled.ScrollView`
  padding: 0 20px;
`;

export const CardAddWarp = styled.TouchableOpacity`
  background: #1B274C;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  height: 60px;
  padding-top: 20px;
  margin: 30px 0;
`;

export const CardAddText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;


export const MainText = styled.Text`
  font-size: 24px;
  font-family: 'BMJUA_ttf';
  margin-top: 20px;
  margin-bottom: 10px;
  letter-spacing: -1px;
`;

export const HeaderTextPattern = styled.View`
  position: absolute;
  top: 28px;
  left: 0px;
  width: 80px;
  height: 16px;
  background: #1978f3 0% 0% no-repeat padding-box;
  opacity: 0.15;
`;

export const DirectionRow = styled.View`
  flex-direction: row;
  flex: 1;
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
  font-size: 16px;
  font-family: 'BMJUA_ttf';
`;

export const NormalText = styled.Text`
  font-size: 24px;
  padding-top: 10px;
  padding-left: 40px;
`;

export const CommonTextInputWarp = styled.View`
  width:100%;
  flex-direction: row;
  flex: 1;
  align-items: center;
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
  border: 2px solid #eee;
  background: white;
  font-family: 'BMJUA_ttf';
`;
