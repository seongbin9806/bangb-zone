import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Alert, Platform, BackHandler } from 'react-native';
import styled from 'styled-components';
import Textarea from 'react-native-textarea';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const Container = styled.View`
  flex: 1;
  width: 100%;
  background: white;
`;

const Body = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

const Header = styled.View`
  width: 100%;
  height: 80px;
  background: #1B274C;
  align-items: center;
  flex-direction: row;
`;

const HeaderTextWarp = styled.View`
    display: flex;
    flex: 3;
    margin-left: 20px;
    justify-content: center;
`;

const HeaderText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
`;

const PageMoveArrowWarp = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-left: 30px;
  width: 50px;
  height: 50px;
`;

const PageMoveArrow = styled.Image``;

const ImportantWarp = styled.Text`
  flex-direction: row;
  flex: 1;
  margin-top: 20px;
`;

const Important = styled.Text`
  color: red;
`;

const HelpText = styled.Text`
  color: black;
  font-size: 16px;
  font-family: 'BMJUA_ttf';
`;

const CommonTextInput = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 10px;
  color: black;
  margin-top: 10px;
  border: 2px solid #eee;
  background: white;
  font-family: 'BMJUA_ttf';
`;

const GoBtn = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  margin: 30px 0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  background: #A9ADBB;
  justify-content: center;
  align-items: center;
`;

const GoBtnText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 18px;
  font-family: 'BMJUA_ttf';
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    marginTop: 10,
    height: 180,
    padding: 5,
    backgroundColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
});

const QuestionScreen = ({navigation}) => {

  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const SubmitInput = () => {
      if(!name){
       Alert.alert('고객명을 입력해주세요.');
       return false;
     }else if(!tel){
       Alert.alert('연락처를 입력해주세요.');
       return false;
     }else if(tel.length !== 11){
       Alert.alert('전화번호는 11자리로 입력해주세요.');
       return false;
     }else if(!email){
       Alert.alert('이메일을 입력해주세요.');
       return false;
     }else if(!content){
       Alert.alert('문의내용을 입력해주세요.');
       return false;
     }

     let formdata = new FormData();

     formdata.append('name', name)
     formdata.append('tel', tel);
     formdata.append('email', email);
     formdata.append('content', content);

     axios.post('http://bangb.zone/api/question_insert', formdata, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
       })
      .then(response => {

        if (response.data.result === 1) {
          Alert.alert('문의 신청되었습니다.');
          navigation.navigate('Intro1');
        } else {
          Alert.alert(response.data.msg);
        }
      })
      .catch(e => {
        Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
      });
  };
  return (
    <Container>
      <Header style={{marginTop: Platform.OS === 'ios' ? 33 : 0}}>
        <PageMoveArrowWarp onPress={() => navigation.navigate('Intro')}>
          <PageMoveArrow
            source={require('../../Assets/Image/Intro/btn_arrow.png')}
            style={{
                resizeMode: 'contain',
                transform: [{ rotate: '180deg'}]
            }}
          />
        </PageMoveArrowWarp>
        <HeaderTextWarp>
          <HeaderText>견적문의 및 상담</HeaderText>
        </HeaderTextWarp>
      </Header>
      <Body>
        <ImportantWarp>
          <Important>⦁</Important>
          <HelpText> 고객명</HelpText>
        </ImportantWarp>
        <CommonTextInput
          placeholder = {'고객명을 입력해주세요.'}
          value={name}
          onChangeText={ text => setName(text) }
          maxLength={5}
        />

        <ImportantWarp>
          <Important>⦁</Important>
          <HelpText> 연락처</HelpText>
        </ImportantWarp>
        <CommonTextInput
          placeholder = {'연락처를 입력해주세요.'}
          value={tel}
          onChangeText={ text => setTel(text) }
          maxLength={11}
        />

        <ImportantWarp>
          <Important>⦁</Important>
          <HelpText> e-mail</HelpText>
        </ImportantWarp>
        <CommonTextInput
          placeholder = {'이메일을 입력해주세요.'}
          value={email}
          onChangeText={ text => setEmail(text) }
        />

        <ImportantWarp>
          <Important>⦁</Important>
          <HelpText> 문의 내용</HelpText>
        </ImportantWarp>

        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea,
            {fontFamily: 'BMJUA_ttf'}
          }
          onChangeText={text => setContent(text)}
          maxLength={200}
          placeholder={'문의 내용을 입력해주세요.'}
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
        />

        <GoBtn onPress={() => SubmitInput() }>
          <GoBtnText>문의하기</GoBtnText>
        </GoBtn>
      </Body>
    </Container>
  );
};

export default QuestionScreen;
