import styled from 'styled-components';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  flex: 1;
  width:100%;
  background: white;
`;

export const Body = styled.ScrollView`
  flex: 1;
`;

export const PickerWarp = styled.View`
  padding: 0 10px;
  margin-top: 10px;
`;

export const NoticeWarp = styled.TouchableOpacity`
  height: 90px;
  width: 100%;
  border-bottom-color : #eee;
  border-bottom-width: 1px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NoticeImageWarp = styled.View`
  margin-right: 20px;
  width: 20%;
`;

export const NoticeImage = styled.Image`
  width: 100%;
`;

export const MainTitleWarp = styled.View`
  width: 75%;
  display: flex;
  flex-direction: column;
`;

export const MainPointTitle = styled.Text`
  font-family: 'BMJUA_ttf';
  font-size: 14px;
`;


export const SubTitleWarp = styled.View`
  display: flex;
  flex-direction: row;
`;

export const SubTitle = styled.Text`
  color: gray;
  text-align : left;
  margin-top: 4px;
  font-family: 'BMJUA_ttf';
`;

export const NoneWarp = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 230px;
`;

export const NoneText = styled.Text`
  color: gray;
  font-size: 16px;
  font-weight: bold;
`;

export const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#c5deff',
    borderRadius: 5,
    height: 50,
    color: '#1978F3',
    paddingRight: 30,
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: '100%',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#c5deff',
    borderRadius: 5,
    height: 50,
    color: '#1978F3',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
