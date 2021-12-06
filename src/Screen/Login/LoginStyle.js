import styled from 'styled-components';

export const Container = styled.ScrollView`
  flex: 1;
  background: white;
  padding: 0 40px;
`;

export const LogoWarp = styled.View`
  height: 130px;
  justify-content: center;
  align-items: center;
`;

export const LogoImg = styled.Image`
  flex: 1;
  background: white;
`;

export const LoginInputwarp = styled.View`
    align-items: center;
    justify-content: center;
`;

export const EmailWarp = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  opacity: 1;
  padding: 10px;
  padding-left: 20px;
  background: #f3f3f3;
  color: #909090;
`;

export const PwdWarp = styled.TextInput`
  margin-top: 20px;
  width: 100%;
  height: 50px;
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  opacity: 1;
  padding: 10px;
  padding-left: 20px;
  background: #f3f3f3;
  color: #909090;
`;

export const SwtichWarp = styled.View`
  height: 80px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;


export const SwtichBarWarp = styled.TouchableOpacity`
  width: 40px;
  height: 30px;
`;

export const SwtichBar = styled.Image`
  width: 100%;
  height: 100%;
`;

export const SwtichBarText = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  font-family: 'BMJUA_ttf';
`;

export const SearchPwdWarp = styled.TouchableOpacity`
  flex : 1;
  align-items: flex-end;
`;

export const SearchPwd = styled.Text`
  color: gray;
  font-family: 'BMJUA_ttf';
  font-size: 16px;
`;

export const SubmitLogin = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background: #333333;
  align-items: center;
  padding-top: 15px;
  border-radius: 5px;
`;

export const LoginText = styled.Text`
  color: white;
  font-family: 'BMJUA_ttf';
  font-size: 16px;
`;


export const SocialTextWarp = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: 30px;
`;

export const SocialText = styled.Text`
  text-align: center;
  font-size: 16px;
`;

export const SocialWarp = styled.View`
  height: 80px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SocialTouchWarp = styled.TouchableOpacity`
    margin: 0 10px;
`;

export const SocialImage = styled.Image`
  width: 50px;
`;

export const JoinWarp = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  background: #4c60a7;
  align-items: center;
  padding-top: 15px;
  border-radius: 5px;
`;

export const JoinHelpText = styled.Text`
  color: black;
  font-size: 18px;
  font-family: 'BMJUA_ttf';
`;

export const JoinText = styled.Text`
  color: white;
  font-size: 16px;
  font-family: 'BMJUA_ttf';
  padding-left: 5px;
`;
