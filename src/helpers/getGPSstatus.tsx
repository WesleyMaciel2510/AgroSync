import {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation'; // Import geolocation library
import {useSharedState} from '../context/globalUseState';

export const useGPSWatcher = () => {
  const {gpsOn, setGpsOn} = useSharedState();

  const handleSuccess = (position: any) => {
    console.log('GPS IS ON = ', position);
    setGpsOn(true); // Set gpsOn to true on success
    return true;
  };

  // Function to handle errors in geolocation retrieval
  const handleError = (error: any) => {
    console.log('GPS IS OFF = ', error);
    setGpsOn(false); // Set gpsOn to false on error
    return false;
  };

  // Options for geolocation
  const options = {
    timeout: 5000, // Timeout in milliseconds
    maximumAge: 0, // Maximum age of a cached position in milliseconds
    enableHighAccuracy: true, // Whether to use high-accuracy mode (if available)
  };

  const getPosition = () => {
    Geolocation.getCurrentPosition(handleSuccess, handleError, options);
  };
  getPosition();

  return getPosition;
};
