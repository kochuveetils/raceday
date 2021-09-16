import React from "react";

import Races from "./RacesComponent";
import Header from "./HeaderComponent";

import { connect } from "react-redux";

import { fetchRace } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    race: state.race,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchRace: () => {
    dispatch(fetchRace());
  },
});

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchRace();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Races
          race={this.props.race}
          fetchRace={() => this.props.fetchRace()}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
