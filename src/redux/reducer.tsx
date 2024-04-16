import {ACTION} from './consts';
import {RootState} from './types';

const initialState: RootState = {
  locationPermission: false,
  isLogged: false,
  userType: '',
  cameraScreen: false,
  token: '',
};

const reducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case ACTION.SET_LOCATION_PERMISSION:
      return {
        ...state,
        locationPermission: action.payload,
      };
    case ACTION.SET_IS_LOGGED:
      return {
        ...state,
        isLogged: action.payload,
      };
    case ACTION.SET_USERTYPE:
      return {
        ...state,
        userType: action.payload,
      };
    case ACTION.SET_CAMERA_SCREEN:
      return {
        ...state,
        cameraScreen: action.payload,
      };
    case ACTION.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
