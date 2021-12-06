import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: #ffffff;
`;

export const Body = styled.ScrollView`
  padding-top: 30px;
`;

export const TouchMenuWarp = styled.View`
  width: 90%;
  height: 45px;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
`;

export const TouchMenu = styled.TouchableOpacity`
  width: 50%;
  height: 100%;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;


export const TouchMenuActiveText = styled.Text`
  text-align: center;
  width: 100%;
  font-size: 20px;
  color: #5A6AA8;
  font-family: 'BMJUA_ttf';
`;

export const TouchMenuText = styled.Text`
  text-align: center;
  font-size: 16px;
  font-family: 'BMJUA_ttf';
`;

export const CardAddBtn = styled.TouchableOpacity`
  width: 90%;
  height: 200px;
  align-items: center;
  background: #333333;
  padding-top: 15px;
  border-radius: 20px;
  padding-top: 70px;
  margin: 20px auto;
`;

export const CardAddText = styled.Text`
  text-align: center;
  font-size: 18px;
  color: black;
  font-weight: bold;
  margin-top: 5px;
`;


export const CardAddBox = styled.TouchableOpacity`
  border: 2px solid #eee;
  width: 80%;
  height: 180px;
  background: #ffffff;
  border-radius: 15px;
  margin: 30px auto;
  position: relative;
`;


export const PlusIconBox = styled.View`
  width: 40px;
  height: 40px;
  margin: 65px auto;
`;

export const PlusIconHorizontal = styled.View`
  width: 40px;
  height: 2px;
  border-radius: 5px;
  background: #5A78AF;
  top: 17px;
  position: absolute;
`;

export const PlusIconVertical = styled.View`
  width: 2px;
  height: 40px;
  border-radius: 5px;
  background: #5A78AF;
  left: 19px;
  position: absolute;
`;

export const CardBoxSubText = styled.Text`
  color: gray;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
`;


export const CardInfoWarp = styled.View`
  background: #5A6AA8;
  width: 80%;
  height: 170px;
  border-radius: 20px;
  padding-top: 50px;
  margin-top: 10px;
  position: relative;
  margin: 20px auto;
`;

export const CardLogo = styled.Image`
  width: 100px;
  position: absolute;
  top: 0px;
  left: 20px;
`;

export const CardNameInfo = styled.Text`
  position: absolute;
  top: 20px;
  left: 25px;
  color: white;
  font-size: 16px;
  font-family: 'BMJUA_ttf';
`;

export const CardNumberInfo = styled.Text`
  text-align: center;
  font-size: 22px;
  font-family: 'BMJUA_ttf';
  color: white;
  margin-top: 10px;
  letter-spacing: -0.5px;
`;

export const Left = styled.View`
  margin-bottom: 70px;
`;

export const PaymentInfoBoxWarp = styled.View`
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 50px;
  margin: 0 auto;
`;

export const PaymentInfoBoxLeft = styled.View`
  border: 1px solid #eee;
  background: #eee;
  padding-left: 20px;
  justify-content: center;
  width: 50%;
`;

export const PaymentInfoBoxRight = styled.View`
  border: 1px solid #eee;
  background: white;
  padding-left: 20px;
  justify-content: center;
  width: 50%;
`;

export const PaymentInfoText = styled.Text`
  font-family: 'BMJUA_ttf';
  font-size: 16px;
`;

export const PaymentListInfo = styled.View`
  margin-bottom: 35px;
`;

export const PaymentListWarp = styled.View`
  height: 140px;
  display: flex;
  flex-direction: column;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
  padding: 20px 40px 0;
`;

export const PaymentListText = styled.View``;

export const CardText = styled.Text`
    font-family: 'BMJUA_ttf';
    font-size: 16px;
    margin-bottom: 3px;
`;

export const PaymentEndWarp = styled.View`
  border-radius: 5px;
  border: 1px solid black;
  width: 80px;
  height: 30px;
  justify-content: center;
  margin-bottom: 10px;
`;

export const NonPaymentWarp = styled.View`
  border-radius: 5px;
  border: 1px solid #fb3f3f;
  width: 80px;
  height: 30px;
  justify-content: center;
`;

export const PaymentStatusText = styled.Text`
    color: #fb3f3f;
    font-size: 16px;
    font-family: 'BMJUA_ttf';
    text-align: center;
`;

export const ColorGray = styled.Text`
    color: gray;
    font-family: 'BMJUA_ttf';
    font-size: 16px;
`;

export const PayBtn = styled.TouchableOpacity`
    width: 80px;
    height: 40px;
    border: 1px solid #5A78AF;
    position: absolute;
    right: 30px;
    border-radius: 10px;
    background: #5A78AF;
`;

export const PayBtnText = styled.Text`
  color: white;
  text-align: center;
  padding-top: 10px;
`;

export const PaymentPriceText = styled.Text`
  color: black;
  font-size: 16px;
  font-family: 'BMJUA_ttf';
  margin-bottom: 3px;
`;

export const ExtensionMonthWarp = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  border-radius: 5px;
  align-items: center;
  background: #5A6AA8;
  justify-content: center;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 130px;
`;

export const ExtensionMonthText = styled.Text`
  color: white;
  font-family: 'BMJUA_ttf';
  font-size: 16px;
`;

export const TextCenter = styled.Text`
  font-weight: bold;
  font-size: 18px;
  display: flex;
  text-align: center;
  margin-top: 30px;
`;

export const CardSelectWarp = styled.View`
  display: flex;
  justify-content: center;
  margin: 30px auto;
  width: 85%;
`;

export const OldCardBtn = styled.TouchableOpacity`
  border-radius: 5px;
  background: #5A6AA8;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NewCardBtn = styled.TouchableOpacity`
  margin-top: 30px;
  border-radius: 5px;
  background: #8b8b8b;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnText = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: white;
    text-align: center;
`;
