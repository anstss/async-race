import './app.scss';
import React from 'react';
import {connect} from "react-redux";
import Nav from "../nav/nav";
import Garage from "../pages/garage/garage";
import Winners from "../pages/winners/winners";
import StateInterface from "../../interfaces/state-interface";
import {GARAGE_VIEW} from "../../shared/constants";

const App = ({view}: {view: string}) => {

  return (
    <div className='mx-5'>
      <h1 className='app-title text-center my-2'>Async Race</h1>
      <Nav/>
      {view === GARAGE_VIEW ? <Garage/> : <Winners/>}
    </div>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(App);