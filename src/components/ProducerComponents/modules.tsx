import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {useInit, useSharedState} from './logic';
//import {useSharedState as useSharedStateUser} from '../User/logic';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import {getAnimationName} from '../../assets/lottie/producer/getAnimationName';
import GreetingComponent from './Weather/greeting';
import TodayColumn from '../../components/ProducerComponents/Weather/todayColumn';
import NextForecast from '../../components/ProducerComponents/Weather/nextForecast';
import ErrorInfo from '../../components/ProducerComponents/Weather/errorInfo';

const ProducerModules = () => {
  const {
    description,
    humidity,
    rain,
    temperature,
    temperatureDaily,
    windSpeed,
    date,
    weatherCode,
    locationPermission,
    loading,
  } = useSharedState();
  useInit();
  // ============================================================================
  const animationURL = getAnimationName(weatherCode, null, false);
  const loadingAnimation = require('../../assets/lottie/producer/time-passing.json');

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const {width} = Dimensions.get('window');
  const startPosition = currentHour * (width < 400 ? 75 : 74);

  // ============================================================================
  return (
    <ScrollView style={[styles.container, {backgroundColor: '#fff'}]}>
      {!locationPermission && <ErrorInfo />}
      {locationPermission && (
        <View>
          <GreetingComponent />

          <LottieView
            source={loading ? loadingAnimation : animationURL}
            autoPlay
            loop
            style={[styles.animationArea, {width: 150, height: 150}]}
          />
          <View style={styles.temperatureArea}>
            <Text style={[styles.text, {fontSize: 50, fontWeight: 'bold'}]}>
              {temperature}º
            </Text>
            <Text style={[styles.text, {fontSize: 23}]}>
              Min.: {temperatureDaily.tempMin[0]}º Max.:{' '}
              {temperatureDaily.tempMax[0]}º
            </Text>
            <Text style={[styles.text, {fontSize: 23}]}>{description}</Text>
          </View>

          <View style={styles.weatherBarArea}>
            <View
              style={[
                styles.simpleBar,
                {backgroundColor: '#3AC0A0', flexDirection: 'row'},
              ]}>
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome5
                  name={'cloud-showers-heavy'}
                  size={20}
                  color="#fff"
                  style={{marginLeft: 10}}
                />
                <Text
                  style={[
                    styles.text,
                    {fontSize: 20, marginLeft: 5, color: 'white'},
                  ]}>
                  {rain} %
                </Text>
              </View>

              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome5 name={'tint'} size={20} color="#fff" />
                <Text
                  style={[
                    styles.text,
                    {fontSize: 20, marginLeft: 5, color: 'white'},
                  ]}>
                  {humidity} %
                </Text>
              </View>

              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome5 name={'wind'} size={20} color="#fff" />
                <Text
                  style={[
                    styles.text,
                    {fontSize: 20, marginLeft: 5, color: 'white'},
                  ]}>
                  {windSpeed}
                </Text>
                <Text style={[styles.text, {fontSize: 20, color: 'white'}]}>
                  Km/h
                </Text>
              </View>
            </View>

            <View style={[styles.boardArea, {backgroundColor: '#3AC0A0'}]}>
              <View style={{flexDirection: 'row', padding: 10}}>
                <View style={styles.leftTextContainer}>
                  <Text
                    style={[
                      styles.text,
                      {fontSize: 20, fontWeight: 'bold', color: 'white'},
                    ]}>
                    Hoje
                  </Text>
                </View>
                <View style={styles.rightTextContainer}>
                  <Text
                    style={[
                      styles.text,
                      {fontSize: 20, fontWeight: 'bold', color: 'white'},
                    ]}>
                    {date[0]} {date[1]}
                  </Text>
                </View>
              </View>
              <ScrollView
                horizontal
                contentOffset={{x: startPosition, y: 0}}
                showsHorizontalScrollIndicator={false}>
                <TodayColumn index={0} />
                <TodayColumn index={1} />
                <TodayColumn index={2} />
                <TodayColumn index={3} />
                <TodayColumn index={4} />
                <TodayColumn index={5} />
                <TodayColumn index={6} />
                <TodayColumn index={7} />
                <TodayColumn index={8} />
                <TodayColumn index={9} />
                <TodayColumn index={10} />
                <TodayColumn index={11} />
                <TodayColumn index={12} />
                <TodayColumn index={13} />
                <TodayColumn index={14} />
                <TodayColumn index={15} />
                <TodayColumn index={16} />
                <TodayColumn index={17} />
                <TodayColumn index={18} />
                <TodayColumn index={19} />
                <TodayColumn index={20} />
                <TodayColumn index={21} />
                <TodayColumn index={22} />
                <TodayColumn index={23} />
              </ScrollView>
            </View>
            <View style={[styles.boardArea, {backgroundColor: '#3AC0A0'}]}>
              <View style={{flexDirection: 'row', padding: 10}}>
                <View style={styles.leftTextContainer}>
                  <Text
                    style={[
                      styles.text,
                      {fontSize: 20, fontWeight: 'bold', color: 'white'},
                    ]}>
                    Próxima Previsão
                  </Text>
                </View>
                <View style={styles.rightTextContainer}>
                  <FontAwesome5
                    name={'calendar-week'}
                    size={30}
                    color="#fff"
                    style={styles.iconStyle}
                  />
                </View>
              </View>
              <View style={styles.rowView}>
                <NextForecast index={0} />
                <NextForecast index={1} />
                <NextForecast index={2} />
                <NextForecast index={3} />
                <NextForecast index={4} />
                <NextForecast index={5} />
                <NextForecast index={6} />
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 20,
  },
  titleArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
  iconStyle: {
    marginHorizontal: 10,
  },
  animationArea: {
    flex: 1,
    alignSelf: 'center',
  },
  temperatureArea: {
    flex: 2,
  },
  weatherBarArea: {
    flex: 1,
    padding: 30,
  },
  simpleBar: {
    flexDirection: 'row',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  boardArea: {
    flex: 2,
    padding: 15,
    borderRadius: 15,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  leftTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightTextContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  columnView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  rowView: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  loadingBackground: {
    backgroundColor: 'black',
    borderRadius: 200,
    padding: 10,
  },
});

export default ProducerModules;
