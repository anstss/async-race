import React, {useContext, useEffect} from "react";
import {connect} from "react-redux";
import StateInterface from "../../interfaces/state-interface";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../actions";
import {AsyncRaceApiServiceContext} from "../async-race-api-service-context/async-race-api-service-context";

const Nav = ({showView, cars, winners}: any) => {

  const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);

  return (
    <nav className='nav d-flex justify-content-center my-3'>
      <button className='btn btn-primary btn-lg mx-3'
              onClick={() => showView('garage')}>
        Garage
      </button>
      <button className='btn btn-primary btn-lg mx-3'
              onClick={() => {
                showView('winners');
                asyncRaceApiService.updateWinners();
              }
              }>
        Winners
      </button>
    </nav>
  )
}

const mapStateToProps = ({cars}: StateInterface) => {
  return {
    cars: cars
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);