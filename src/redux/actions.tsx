import {ActionTypes} from './consts';

export const setLocationPermission = (locationPermission: boolean) => ({
  type: ActionTypes.SET_LOCATION_PERMISSION,
  payload: locationPermission,
});

export const setIsLogged = (isLogged: boolean) => ({
  type: ActionTypes.SET_IS_LOGGED,
  payload: isLogged,
});
