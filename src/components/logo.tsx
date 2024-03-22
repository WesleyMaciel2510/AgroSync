import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Logo = () => {
  return (
    <View style={styles.logoArea}>
      <View style={styles.plant}>
        <LottieView
          source={require('../assets/lottie/plant.json')}
          style={{width: 200, height: 200, margin: 20}}
          autoPlay
          loop={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  plant: {
    backgroundColor: '#6FBAFF',
    borderWidth: 2,
    borderColor: '#3AC0A0',
    borderRadius: 120,
    margin: 20,
    elevation: 15,
  },
  logoArea: {
    paddingBottom: 20,
  },
});

export default Logo;
