import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../static";

export const raceLoading = () => ({
  type: ActionTypes.RACE_LOADING,
});

export const raceFailed = (errmess) => ({
  type: ActionTypes.RACE_FAILED,
  payload: errmess,
});

export const addRace = (race) => ({
  type: ActionTypes.ADD_RACE,
  payload: race,
});

export const fetchRace = () => (dispatch) => {
  dispatch(raceLoading(true));

  return fetch(baseUrl)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((race) => {
      dispatch(addRace(race.data));
    })
    .catch((error) => dispatch(raceFailed(error.message)));

  // return fetch(baseUrl)
  //   .then(
  //     (response) => {
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         var error = new Error(
  //           "Error " + response.status + ": " + response.statusText
  //         );
  //         error.response = response;
  //         throw error;
  //       }
  //     },
  //     (error) => {
  //       var errmess = new Error(error.message);
  //       throw errmess;
  //     }
  //   )
  //   .then((response) => response.json())
  //   .then((race) => {
  //     dispatch(addRace(race.data));
  //   })
  //   .catch((error) => dispatch(raceFailed(error.message)));
};
