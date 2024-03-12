import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSharedState} from '../../../components/ProducerComponents/logic';
import {getAnimationName} from '../../../assets/lottie/producer/getAnimationName';

const NextForecast = ({index}) => {
  const {week, temperatureDaily, weatherCodeDaily} = useSharedState();
  // ===========================================================================
  const animationURL = getAnimationName(weatherCodeDaily[index], null, false);

  // ===========================================================================

  return (
    <View style={styles.line}>
      <Text style={styles.text}> {week[index]}</Text>
      <LottieView
        source={animationURL}
        style={styles.animationArea}
        loop
        autoPlay
      />
      <View style={styles.headerArea}>
        <Text style={[styles.text, {marginRight: 20}]}>
          {temperatureDaily.tempMin[index]}º{' '}
        </Text>
        <Text style={styles.text}> {temperatureDaily.tempMax[index]}º</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  animationArea: {
    flex: 1,
    alignSelf: 'center',
    width: 50,
    height: 50,
    margin: 10,
    paddingLeft: 10,
  },
});

export default NextForecast;
