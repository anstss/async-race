import React, {useContext} from "react";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import StateInterface from "../../interfaces/state-interface";
import * as actions from "../../actions";
import {AsyncRaceApiServiceContext} from "../async-race-api-service-context/async-race-api-service-context";
import {GARAGE_VIEW, WINNERS_VIEW} from "../../shared/constants";

const Nav = ({showView, currentWinnersPage}: any) => {

  const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);


  return (
    <nav className='nav d-flex justify-content-center my-3'>
      <button className='btn btn-primary btn-lg mx-3'
              onClick={() => showView(GARAGE_VIEW)}>
        Garage
      </button>
      <button className='btn btn-primary btn-lg mx-3'
              onClick={() => {
                showView(WINNERS_VIEW);
                asyncRaceApiService.showWinners(currentWinnersPage);
              }
              }>
        Winners
      </button>
    </nav>
  )
}

const mapStateToProps = ({currentWinnersPage}: StateInterface) => {
  return {
    currentWinnersPage
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);