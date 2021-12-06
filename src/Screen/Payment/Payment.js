
import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from  '../Common/Loader';
import {HeaderBackScreen} from '../Header/Header';


import{
    Container,
    Body,
    TouchMenuWarp,
    TouchMenu,
    TouchMenuActiveText,
    TouchMenuText,
    MainText,
    CardAddBtn,
    CardAddText,
    CardAddBox,
    PlusIconBox,
    PlusIconHorizontal,
    PlusIconVertical,
    CardBoxSubText,
    CardInfoWarp,
    CardLogo,
    CardNameInfo,
    CardNumberInfo,
    PaymentInfoBoxWarp,
    PaymentInfoBoxLeft,
    PaymentInfoBoxRight,
    PaymentInfoText,
    PaymentListInfo,
    PaymentListWarp,
    PaymentListText,
    PaymentEndWarp,
    NonPaymentWarp,
    PaymentStatusText,
    CardText,
    ColorGray,
    PayBtn,
    PayBtnText,
    PaymentPriceText,
    ExtensionMonthWarp,
    ExtensionMonthText,
    TextCenter,
    CardSelectWarp,
    OldCardBtn,
    NewCardBtn,
    BtnText
} from './PaymentStyle';


const PaymentScreen = ({navigation}) => {

  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState('');
  const [cardInfo, setCardInfo] = useState({});
  const [paymentList, setPaymentList] = useState([]);
  const [installmentMonth, setInstallmentMonth] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMemberInfo();

    });
    return unsubscribe;
  }, [navigation]);

  const getMemberInfo = useCallback(async () => {

    const userData = await AsyncStorage.getItem('userData');

    if (userData !== null) {
      let data = JSON.parse(userData);
      let formdata = new FormData();

      setUserId(data.id);

      formdata.append('id', data.id);
      axios.post('http://bangb.zone/api/get_payment_info', formdata, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response.data.result === 1) {
              setCardInfo({...response.data.card_info});

              if(Object.keys({...response.data.card_info}).length > 0){
                setInstallmentMonth(response.data.card_info.ins_month);
                setPaymentList([...response.data.payment_list]);
              }
          } else {
            Alert.alert(response.data.msg);
          }
        })
        .catch(e => {
          Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
      });

    }else{
      Alert.alert('로그인 세션이 만료되었습니다.');
      navigation.navigate('Login');
    }
  }, [navigation]);

  const extensionMonth = () => {

    let formdata = new FormData();

    formdata.append('card_idx', cardInfo.card_idx);

    axios.post('http://bangb.zone/api/extension_month', formdata, {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response.data.result === 1) {
          Alert.alert('연장되었습니다.');
          setInstallmentMonth(response.data.extension_month);
        } else {
          Alert.alert(response.data.msg);
        }
      })
      .catch(e => {
        Alert.alert('관리자에게 문의하십시오\n ErrorCode:', e.message);
    });
  };

  const oldCardContinue = () => {

    let formdata = new FormData();

    formdata.append('id', userId);
    formdata.append('card_addition_type', 'old');
    formdata.append('card_number', cardInfo.real_card_number);
    formdata.append('expiry', cardInfo.expiry);
    formdata.append('birth', cardInfo.birth);
    formdata.append('pwd_2digit', cardInfo.pwd_2digit);

    axios.post('http://bangb.zone/api/member_card_addition', formdata, {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response.data.result === 1) {
          Alert.alert('기존 카드로 진행되었습니다.');
          getMemberInfo();
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
          <HeaderBackScreen navigation={navigation} />
          <Body>
            <Loader/>

            {
              <TouchMenuWarp>
                <TouchMenu onPress={ () => setPage(1) }>
                  {page == 1?
                    <TouchMenuActiveText>결제 카드</TouchMenuActiveText> :
                    <TouchMenuText>결제 카드</TouchMenuText>
                  }
                </TouchMenu>
                <TouchMenu onPress={ () => setPage(2) }>
                  {page == 2?
                    <TouchMenuActiveText>결제 내역</TouchMenuActiveText> :
                    <TouchMenuText>결제 내역</TouchMenuText>
                  }
                </TouchMenu>
              </TouchMenuWarp>
            }
            {
              page == 1?
                  <>
                    <CardInfoWarp>
                      <CardNameInfo>{cardInfo.card_name}</CardNameInfo>
                      <CardNumberInfo>{cardInfo.card_number}</CardNumberInfo>
                    </CardInfoWarp>
                    <PaymentInfoBoxWarp style={{marginTop: 10}}>
                      <PaymentInfoBoxLeft>
                        <PaymentInfoText>다음 결제일</PaymentInfoText>
                      </PaymentInfoBoxLeft>
                      <PaymentInfoBoxRight>
                        <PaymentInfoText>{cardInfo.next_pay_date}</PaymentInfoText>
                      </PaymentInfoBoxRight>
                    </PaymentInfoBoxWarp>

                    <PaymentInfoBoxWarp>
                      <PaymentInfoBoxLeft>
                        <PaymentInfoText>남은 할부 개월 수</PaymentInfoText>
                      </PaymentInfoBoxLeft>
                      <PaymentInfoBoxRight>
                        <PaymentInfoText>{installmentMonth}</PaymentInfoText>
                      </PaymentInfoBoxRight>
                    </PaymentInfoBoxWarp>

                    <ExtensionMonthWarp onPress={ () => extensionMonth() }>
                      <ExtensionMonthText>36개월 연장하기 (최대 72개월)</ExtensionMonthText>
                    </ExtensionMonthWarp>
                  </>
              : /* page = 2 */
                <PaymentListInfo>
                  {
                    paymentList.map((item, index) => {
                      return(
                        <PaymentListWarp key={index}
                          style={{backgroundColor: item.status === 'failed' ? '#fff9ff' : 'null'}}
                        >
                          <PaymentListText>
                            {item.status === 'failed'?
                              <NonPaymentWarp>
                                <PaymentStatusText>{item.status_text}</PaymentStatusText>
                              </NonPaymentWarp>
                              :
                              <PaymentEndWarp>
                                <PaymentStatusText style={{color:'black'}}>{item.status_text}</PaymentStatusText>
                              </PaymentEndWarp>
                            }
                            <CardText>({item.card_name}) {item.card_number}</CardText>
                            <PaymentPriceText>결제금액: {item.amount}원</PaymentPriceText>
                            <ColorGray>결제일: {item.pay_date}</ColorGray>
                          </PaymentListText>

                          {item.status == 'failed' ?
                            <PayBtn>
                              <PayBtnText>납부하기</PayBtnText>
                            </PayBtn>
                            :
                            null
                          }
                        </PaymentListWarp>
                      );
                    })
                  }
                </PaymentListInfo>
            }
          </Body>
        </Container>
    );
};

export default PaymentScreen;
