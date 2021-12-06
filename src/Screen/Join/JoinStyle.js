import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  width: 100%;
`;

export const Body = styled.ScrollView`
  padding: 0 30px 0 30px;
`;

export const MainText = styled.Text`
  font-size: 22px;
  margin-top: 20px;
  margin-bottom: 10px;
  letter-spacing: -1px;
  font-family: 'BMJUA_ttf';
`;

export const HeaderTextPattern = styled.View`
  position: absolute;
  top: 23px;
  left: 0px;
  width: 70px;
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

export const PolicyWarp = styled.View`
  flex-direction: row;
  flex: 1;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const Row = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const CertifiBtn = styled.TouchableOpacity`
  background: #4c60a7;
  align-items: center;
  border-radius: 5px;
  width: 35%;
  height: 45px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-left: 10px;
`;

export const NormalText = styled.Text`
  flex:2;
  padding-left: 3px;
  font-size: 12px;
`;

export const MovePolicyWarp = styled.TouchableOpacity`
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
  border: 2px solid #eee;
  background: white;
`;

export const SubmitJoin = styled.TouchableOpacity`
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
