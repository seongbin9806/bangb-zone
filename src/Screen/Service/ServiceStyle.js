import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Body = styled.ScrollView`
  background: white;
  padding: 30px 30px;
`;


export const TouchMenuWarp = styled.View`
  width: 100%;
  height: 45px;
  flex-direction: row;
  justify-content: space-between;
`;

export const TouchMenu = styled.TouchableOpacity`
  width: 50%;
  height: 100%;
`;


export const TouchMenuActiveText = styled.Text`
  text-align: center;
  width: 100%;
  padding-bottom: 20px;
  border-bottom-color: black;
  border-bottom-width: 3px;
`;

export const TouchMenuText = styled.Text`
  text-align: center;
`;

export const MainText = styled.Text`
  margin-top: 30px;
  margin-bottom: 50px;
`;
