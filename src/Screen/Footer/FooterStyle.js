import styled from 'styled-components';

export const FooterWarp = styled.View`
  width: 100%;
  height: 55px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-top-color : #eee;
  border-top-width: 1px;
  position: absolute;
  bottom:0;
  margin-top: 60px;
`;

export const TouchWarp = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MenuHome = styled.Image`
  width: 30px;
  height:100%;
`;
