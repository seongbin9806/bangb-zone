import styled from 'styled-components';

export const Container = styled.ScrollView`
  flex: 1;
  width:100%;
  background: white;
  padding: 10px 30px;
`;

export const Body = styled.View`
  flex: 1;
`;

export const TopMenuWarp = styled.View`
  width:100%;
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
`;

export const LogoImageWarp = styled.TouchableOpacity`
`;

export const LogoImage = styled.Image`
  height: 100%;
  width: 160px;
  margin-top: 3px;
`;

export const CloseImageWarp = styled.TouchableOpacity`
  margin-top: -5px;
`;

export const CloseImage = styled.Image`
  height: 100%;
  width: 40px;
`;


export const MemberInfoWarp = styled.View`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

export const DeviceInfoWarp = styled.View`
  margin-top: 10px;
  margin-left: -3px;
  display: flex;
  flex-direction: row;
  border-bottom-color: #f3f3f3;
  border-bottom-width: 2px;
  height: 50px;
`;

export const PointText = styled.Text`
  color: #6F80FE;
  margin-left: 4px;
  font-size: 22px;
`;

export const BoldText = styled.Text`
  font-size: 16px;
  padding-top: 4px;
`;

export const SideText = styled.Text`
  font-size: 16px;
  padding-top: 4px;
  font-family: 'BMJUA_ttf';
`;

export const NormalText = styled.Text`
  margin-right: 5px;
  font-size: 16px;
  padding-top: 4px;  
`;

export const MoveListWarp = styled.View`
  margin-top: 20px;
`;

export const Move = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
`;

export const MoveIcon = styled.Image`
  width: 25px;
  margin-right: 10px;
`;

export const LogoutWarp = styled.TouchableOpacity`
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const LogoutText = styled.Text`
  color: gray;
`;
