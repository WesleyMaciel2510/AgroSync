import ActionTypes from './consts';

export interface RootState {
  locationPermission: any;
  isLogged: boolean;
}

const initialState = {
  locationPermission: false,
  isLogged: false,
};

// Define reducer function
const store = (state = initialState, action: {type: string; payload: any}) => {
  switch (action.type) {
    case ActionTypes.SET_LOCATION_PERMISSION:
      return {
        ...state,
        locationPermission: action.payload,
      };
    case ActionTypes.SET_IS_LOGGED:
      return {
        ...state,
        isLogged: action.payload,
      };
    default:
      return state;
  }
};

export default store;
