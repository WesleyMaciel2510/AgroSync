import Geolocation from '@react-native-community/geolocation';
type Position = {
  positionLatitude: string;
  positionLongitude: string;
};
export const getPosition = (): Promise<Position> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position: {coords: {latitude: number; longitude: number}}) => {
        const positionLatitude = position.coords.latitude.toFixed(4);
        const positionLongitude = position.coords.longitude.toFixed(4);
        resolve({positionLatitude, positionLongitude});
      },
      (error: any) => {
        console.error('ERROR IN GETPOSITION = ', error);
        reject(error);
      },
      {}, // options object
    );
  });
};
