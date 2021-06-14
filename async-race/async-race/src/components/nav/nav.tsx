import React from "react";
import {connect} from "react-redux";
import StateInterface from "../../interfaces/state-interface";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../actions";

const Nav = ({showView}: any) => {

  return (
    <nav className='nav d-flex justify-content-center my-3'>
      <button className='btn btn-primary btn-lg mx-3'
              onClick={() => showView('garage')}>
        Garage
      </button>
      <button className='btn btn-primary btn-lg mx-3'
              onClick={() => showView('winners')}>
        Winners
      </button>
    </nav>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return state;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);