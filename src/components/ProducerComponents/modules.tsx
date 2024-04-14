import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import CardHome from '../cardHome';
import {StackNavigationProp} from '@react-navigation/stack';
import {storage} from '../../helpers/storage';
import {
  checkLocationPermission,
  requestLocationPermission,
} from '../../services/weather/askPermission';
import {useGPSWatcher} from '../../helpers/getGPSstatus';
import {setLocationPermission} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import reducer from '../../redux/reducer';
import {RootState} from '../../redux/types';

interface Props {
  navigation: StackNavigationProp<any>;
}
const ProducerModules: React.FC<Props> = ({navigation}) => {
  const {gpsOn, setGpsOn} = useSharedGlobalState();
  const getGPSstatus = useGPSWatcher();
  const dispatch = useDispatch();
  const locationPermission = useSelector(
    (state: RootState) => state.locationPermission,
  );
  // ============================================================

  /*   useEffect(() => {
    // Retrieve the location status from storage
    const locationStatus = storage.getBoolean('locationStatus') || null;

    //setLocationPermission(locationStatus !== null ? locationStatus : false);
  }, []); */

  const getLocationPermission = async () => {
    try {
      // Check if location permission is granted
      const isLocationPermissionGranted = await checkLocationPermission();
      console.log(
        '@isLocationPermissionGranted = ',
        isLocationPermissionGranted,
      );
      if (isLocationPermissionGranted) {
        console.log('vai chamar dispatch');
        //dispatch(setLocationPermission(isLocationPermissionGranted));
        // Return true if permission already granted
        return true;
      } else {
        // Request location permission if not granted
        const permission = await requestLocationPermission();
        console.log('@ permission = ', permission);

        // Return true if permission granted, false otherwise
        return permission;
      }
    } catch (error) {
      // Handle any errors that occur during permission check or request
      console.error('Error getting location permission:', error);
      return false;
    }
  };

  const cardsData = [
    {
      cardTitle: 'Previsão \n do Tempo',
      cardIcon: 'cloud-sun',
      cardAction: async () => {
        /* if (!reducer.locationPermission) {
          // Call the function to handle location permission
          const result = await getLocationPermission();

          getGPSstatus();
          console.log('result = ', result);
          console.log('gpsOn = ', gpsOn);
          if (result && gpsOn) {
            setGpsOn(true);
            console.log('FOI PARA A TELA Forecast');
            navigation.navigate('Forecast');
          } else {
            setGpsOn(false);
          }
        } */
      },
    },
    {
      cardTitle: 'Teste Redux',
      cardIcon: 'cloud-sun',
      cardAction: async () => {
        console.log('clicou');
        console.log('REDUX LOCATION PERMISSION = ', locationPermission);
        try {
          console.log('chamou o try');
          dispatch(setLocationPermission(true));
          console.log('passou o dispatch');
        } catch (error) {
          console.error('Error executing dispatch = ', error);
        }
      },
    },
  ];

  return (
    <View style={styles.container}>
      {cardsData.map((data, index) => (
        <CardHome
          key={index}
          cardTitle={data.cardTitle}
          cardIcon={data.cardIcon}
          onPress={data.cardAction}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default ProducerModules;
