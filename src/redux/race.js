import * as ActionTypes from "./ActionTypes";

export const Race = (
  state = {
    isLoading: false,
    errMess: null,
    race: {},
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_RACE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        race: action.payload,
      };
    case ActionTypes.RACE_LOADING:
      return { ...state, isLoading: true, errMess: null, race: {} };
    case ActionTypes.RACE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        race: {},
      };

    default:
      return state;
  }
};
