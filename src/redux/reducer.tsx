import {ActionTypes} from './consts';

const initialState = {
  locationPermission: false,
  isLogged: false,
};

const reducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
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

export default reducer;
