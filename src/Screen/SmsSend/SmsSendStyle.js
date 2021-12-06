import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background: white;
`;

export const Title = styled.Text`
    font-size: 24px;
    color: #1B274C;
    font-weight: bold;
    text-align: center;
    margin: 40px 0;
`;

export const BtnSubIcon = styled.Image`
`;

export const NontBtn = styled.TouchableOpacity`
    width: 90%;
    height: 70px;
    margin: 20px auto;
    background: #1B274C;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const SendSmsBtn = styled.TouchableOpacity`
    width: 90%;
    height: 70px;
    margin: 0px auto;
    margin-top: 15px;
    background: #ff5454;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const BtnText = styled.Text`
    margin-left: 5px;
    font-size: 18px;
    font-weight: bold;
    color: white;
`;
