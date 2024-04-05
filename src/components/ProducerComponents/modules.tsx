import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {useInit, useSharedState} from './logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import {getAnimationName} from '../../assets/lottie/producer/getAnimationName';
import GreetingComponent from './Weather/greeting';
import TodayColumn from '../../components/ProducerComponents/Weather/todayColumn';
import NextForecast from '../../components/ProducerComponents/Weather/nextForecast';
import DeniedPermission from '../../screens/DeniedPermissionScreen';
import {
  requestLocationPermission,
  checkLocationPermission,
} from '../../services/weather/askPermission';
import {storage} from '../../helpers/storage';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

const ProducerModules: React.FC<Props> = ({navigation}) => {
  const {
    description,
    humidity,
    rain,
    temperature,
    temperatureDaily,
    windSpeed,
    date,
    weatherCode,
    loading,
  } = useSharedState();
  const {gpsOn, setGpsOn} = useSharedGlobalState();
  const [locationPermission, setLocationPermission] = useState(false);
  useInit();
  console.log('gpsOn = ', gpsOn);
  // ==================================================================

  useEffect(() => {
    const getLocationPermission = async () => {
      // Retrieve the location status from storage
      const locationStatus = storage.getBoolean('locationStatus');

      // Update location permission state if status is true
      if (locationStatus) {
        setLocationPermission(locationStatus);
      } else {
        // Check and request location permission if not granted
        const isLocationPermissionGranted = await checkLocationPermission();
        if (!isLocationPermissionGranted) {
          await requestLocationPermission();
        }
        setLocationPermission(isLocationPermissionGranted);
      }
    };

    // Call the function to handle location permission
    getLocationPermission();
  }, []);
  // ==================================================================
  const animationURL = getAnimationName(weatherCode, null, false);
  const loadingAnimation = require('../../assets/lottie/loading-black.json');

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const {width} = Dimensions.get('window');
  const startPosition = currentHour * (width < 400 ? 75 : 74);

  // ============================================================================
  return (
    <ScrollView style={[styles.container, {backgroundColor: '#fff'}]}>
      {locationPermission ? (
        <View>
          {!gpsOn ? (
            <View>
              <LottieView
                source={require('../../assets/lottie/forgot.json')}
                style={{width: 200, height: 200, margin: 20}}
                autoPlay
                loop={true}
              />
            </View>
          ) : null}
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
              {temperatureDaily &&
                temperatureDaily.tempMin &&
                temperatureDaily.tempMin[0] && (
                  <>Min.: {temperatureDaily.tempMin[0]}º </>
                )}
              {temperatureDaily &&
                temperatureDaily.tempMax &&
                temperatureDaily.tempMax[0] && (
                  <>Max.: {temperatureDaily.tempMax[0]}º </>
                )}
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
                  {windSpeed > 0 ? windSpeed : 5 + ' '}
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
                {/* Using a loop to dynamically render TodayColumn components instead of writing the same code many times */}
                {Array.from({length: 24}, (_, index) => (
                  <TodayColumn key={index} index={index} />
                ))}
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
                {/* Using a loop to dynamically render NextForecast components instead of writing the same code many times */}
                {Array.from({length: 7}, (_, index) => (
                  <NextForecast key={index} index={index} />
                ))}
              </View>
            </View>
          </View>
        </View>
      ) : (
        <DeniedPermission permissionLabel="location" navigation={navigation} />
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
