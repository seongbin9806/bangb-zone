import styled from 'styled-components';

export const HeaderWrap = styled.View`
  height: 65px;
  background: white;
  display: flex;
  flex-direction: row;
  border-bottom-color : #eee;
  border-bottom-width: 1px;
`;

export const MenuWrap = styled.TouchableOpacity`
   flex : 1;
   justify-content: center;
   align-items: flex-start;
`;


export const MenuImage = styled.Image`
  height: 100%;
  width: 35px;
  margin-left: 15px;
`;

export const GoBackWrap = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  padding-left: 30px;
`;

export const GoBackImage = styled.Image`  `;

export const LogoWrap = styled.TouchableOpacity`
   flex : 1;
   justify-content: center;
   align-items: center;
`;

export const LogoWrap2 = styled.TouchableOpacity`
   flex : 1;
   justify-content: center;
   align-items: center;
`;

export const MenuWrap2 = styled.TouchableOpacity`
   flex : 1;
   justify-content: center;
   align-items: flex-end;
   padding-right: 20px;
`;

export const LogoImage = styled.Image`
    height: 100%;
    width: 150px;
`;

export const BellWrap = styled.TouchableOpacity`
   flex : 1;
   justify-content: center;
   align-items: flex-end;
   position : relative;
`;

export const BellImage = styled.Image`
  width: 26px;
  height: 100%;
  margin-right:10px;
`;

export const BellCountWarp = styled.View`
  position : absolute;
  right: 4px;
  top: 12px;
  background: red;
  width: 20px;
  height: 20px;
  border-radius: 25px;
`;

export const BellCount = styled.Text`
  color: white;
  text-align: center;
  font-size: 12px;
  padding-top: 2px;
`;
