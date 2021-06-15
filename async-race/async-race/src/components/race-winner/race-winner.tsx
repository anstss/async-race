import "./race-winner.scss";
import React from "react";
import {connect} from "react-redux";
import StateInterface from "../../interfaces/state-interface";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../actions";

//FIXME: fix any type
const RaceWinner = ({winner, hideAndClearCurrentWinner}: any) => {

  const {name, winTime} = winner;

  return (
    <div className='race-winner'>
      <div className="race-winner__card card text-white bg-primary mb-3">
        <div className="card-body d-flex flex-column align-items-center">
          <h4 className="card-title my-4">{name} win ({winTime} s)</h4>
          <button type="button" className="btn btn-success col-4"
                  onClick={() => hideAndClearCurrentWinner()}>Ok</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    winner: state.currentWinner
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(RaceWinner);