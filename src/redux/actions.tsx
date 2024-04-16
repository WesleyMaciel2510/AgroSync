import {ACTION} from './consts';

export const setLocationPermission = (locationPermission: boolean) => ({
  type: ACTION.SET_LOCATION_PERMISSION,
  payload: locationPermission,
});

export const setIsLogged = (isLogged: boolean) => ({
  type: ACTION.SET_IS_LOGGED,
  payload: isLogged,
});

export const setUserType = (userType: string) => ({
  type: ACTION.SET_USERTYPE,
  payload: userType,
});

export const setCameraScreen = (cameraScreen: boolean) => ({
  type: ACTION.SET_USERTYPE,
  payload: cameraScreen,
});

export const setToken = (token: boolean) => ({
  type: ACTION.SET_TOKEN,
  payload: token,
});
