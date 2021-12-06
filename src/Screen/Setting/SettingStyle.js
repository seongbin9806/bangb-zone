import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Body = styled.ScrollView`
  background: white;
  padding: 15px 30px 0px;
`;

export const SettingWarp = styled.View`
  height: 55px;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const SettingText = styled.Text`
  font-size: 18px;
  font-family: 'BMJUA_ttf';
`;

export const SwitchWarp = styled.TouchableOpacity`
  width: 50px;
  height: 40px;
`;

export const SwitchImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const LogoutWarp = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  margin: 30px 0;
  background: gray;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const LogoutText = styled.Text`
  color: white;
  font-family: 'BMJUA_ttf';
  font-size: 16px;
`;
