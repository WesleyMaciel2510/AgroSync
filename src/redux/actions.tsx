import {ACTION} from './consts';

export const setLocationPermission = (locationPermission: boolean) => ({
  type: ACTION.SET_LOCATION_PERMISSION,
  payload: locationPermission,
});

export const setIsLogged = (isLogged: boolean) => ({
  type: ACTION.SET_IS_LOGGED,
  payload: isLogged,
});
