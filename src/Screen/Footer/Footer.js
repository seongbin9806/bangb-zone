
import React from 'react';
import { Platform } from 'react-native';
import{
  FooterWarp,
  TouchWarp,
  MenuHomeWarp,
  MenuHome
} from './FooterStyle';

const FooterScreen = ({navigation}) => {

  return (
    <FooterWarp style={{marginBottom: Platform.OS === 'ios' ? 15: 0}}>
      <TouchWarp onPress={ () => navigation.navigate('Home')}>
        <MenuHome
          source={require('../../Assets/Image/home.png')}
          style={{resizeMode: 'contain'}}
        />
      </TouchWarp>      
    </FooterWarp>
  );
};

export default FooterScreen;
