import React, { useState, useEffect, useCallback } from 'react';
import {Text} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

export const LoaderScreen = () => {

  const [visible, setVisible] = useState(true);

  useEffect(() => {

      let interval = setInterval(() => {
        setVisible(!visible);
      }, visible === true? 800 : null);

       return () => clearInterval(interval);
  }, []);

  return(
      <AnimatedLoader
         visible={visible}
         overlayColor="rgba(255, 255, 255, 255)"
         source={require('../../Assets/Image/79609-loading-button.json')}
         animationStyle={{width: 200, height: 200}}
         speed={1}>
      </AnimatedLoader>
  );
};

export default LoaderScreen;
