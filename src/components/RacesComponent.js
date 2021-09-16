import React, { useState } from "react";
import {
  TOGGLE_CATEGORY,
  MAX_ROW_DISPLAY,
  DISAPPEAR_TIME_MINUTES,
  ENABLE_REFRESH_BUTTON,
} from "../static";
import Timer from "./TimerComponent";

export default function RacesComponent({ race, fetchRace }) {
  const [category, setCategory] = useState("");

  const getTimerTimes = (millisec) => {
    let timerMinutes = Math.floor(millisec / 60000);
    let timerSeconds = parseInt(((millisec % 60000) / 1000).toFixed(0));

    return { timerMinutes, timerSeconds };
  };

  const populateSelect = () => {
    return TOGGLE_CATEGORY.map((option) => (
      <option key={option.id} value={option.id}>
        {option.race}
      </option>
    ));
  };

  const handleChange = (e) => {
    const { value } = e.target;
    e.preventDefault();
    setCategory(() => value);
  };

  const renderRaces = ({ isLoading, errMess, race }) => {
    if (isLoading) {
      return <h3 className="card-heading">Race getting Loaded</h3>;
    }

    if (errMess) {
      return <h3 className="card-heading">Race contains Error {errMess}</h3>;
    }

    if (Object.keys(race).length > 0) {
      const compare = (a, b) => {
        let comparison = 0;
        if (
          race.race_summaries[a].advertised_start.seconds >
          race.race_summaries[b].advertised_start.seconds
        ) {
          comparison = 1;
        } else if (
          race.race_summaries[a].advertised_start.seconds <
          race.race_summaries[b].advertised_start.seconds
        ) {
          comparison = -1;
        }
        return comparison;
      };

      let counter = 0;
      let milliSecondsLowLimit = 0 - DISAPPEAR_TIME_MINUTES * 60 * 1000; //For Minute TO milliseconds

      let currMilliSeconds = new Date().getTime();

      let raceArray = [];

      race.next_to_go_ids.sort(compare).forEach((races, i) => {
        if (
          race.race_summaries[races].advertised_start.seconds * 1000 -
            currMilliSeconds >=
          milliSecondsLowLimit
        ) {
          const { timerMinutes, timerSeconds } = getTimerTimes(
            race.race_summaries[races].advertised_start.seconds * 1000 -
              currMilliSeconds
          );

          if (
            race.race_summaries[races].category_id === category ||
            !category
          ) {
            counter++;
            if (counter <= MAX_ROW_DISPLAY)
              raceArray.push(
                <div
                  className="box"
                  style={{
                    backgroundColor: TOGGLE_CATEGORY.find(
                      (cat) => cat.id === race.race_summaries[races].category_id
                    ).color,
                  }}
                  key={races}
                >
                  <div id="meeting">
                    {race.race_summaries[races].meeting_name}
                  </div>
                  <div id="racing">
                    <h5>Race# {race.race_summaries[races].race_number} </h5>
                    <h5>
                      {
                        TOGGLE_CATEGORY.find(
                          (cat) =>
                            cat.id === race.race_summaries[races].category_id
                        ).race
                      }
                    </h5>
                  </div>
                  <div id="date">
                    {new Date(
                      race.race_summaries[races].advertised_start.seconds * 1000
                    ).toLocaleString("en", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </div>
                  <div id="timer">
                    <Timer
                      propmin={timerMinutes}
                      propsec={timerSeconds}
                      fetchRace={() => fetchRace()}
                    />
                  </div>
                </div>
              );
          }
        }
      });
      return raceArray;
    }
    return;
  };

  return (
    <div className="container">
      <form className="grid-search">
        <div className="search-section">
          <label>
            Category:
            <select value={category} onChange={handleChange}>
              {populateSelect()}
              <option value=""></option>
            </select>
          </label>
        </div>
        <div className="search-section ">
          {ENABLE_REFRESH_BUTTON ? (
            <button
              className="button"
              onClick={(e) => {
                e.preventDefault();
                fetchRace();
              }}
            >
              {" "}
              Refresh
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>

      <div className="grid-container">{renderRaces(race)}</div>
    </div>
  );
}
