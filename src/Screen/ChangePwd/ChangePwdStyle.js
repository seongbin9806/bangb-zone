import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: #fff;
`;

export const Body = styled.ScrollView`
  padding: 30px 30px;
`;

export const MainText = styled.Text`
  font-size: 22px;
  font-family: 'BMJUA_ttf';
  margin-top: 30px;
  margin-bottom: 10px;
  letter-spacing: -1px;
`;

export const HeaderTextPattern = styled.View`
  position: absolute;
  top: 40px;
  left: 0px;
  width: 115px;
  height: 16px;
  background: #1978f3 0% 0% no-repeat padding-box;
  opacity: 0.15;
`;

export const ImportantWarp = styled.Text`
  flex-direction: row;
  flex: 1;
  margin-top: 10px;
`;

export const Important = styled.Text`
  color: red;
  font-size: 18px;
`;

export const HelpText = styled.Text`
  color: gray;
  font-size: 16px;
  font-family: 'BMJUA_ttf';
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

export const SubmitBtn = styled.TouchableOpacity`
  background: #4c60a7;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  height: 50px;
  padding-top: 15px;
  margin-top: 30px;
  margin-bottom: 30px;
`;


export const BtnText = styled.Text`
  font-size: 16px;
  font-family: 'BMJUA_ttf';
  color: white;
`;
