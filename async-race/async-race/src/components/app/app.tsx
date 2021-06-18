import './app.scss';
import React from 'react';
import Nav from "../nav/nav";
import Garage from "../pages/garage/garage";
import Winners from "../pages/winners/winners";
import Pagination from "../pagination/garage-pagination";
import StateInterface from "../../interfaces/state-interface";
import {connect} from "react-redux";

const App = ({view}: {view: string}) => {
  // const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);
  // console.log(asyncRaceApiService.getAllCars());
  // const {view} = store.getState();

  return (
    <div className='mx-5'>
      <h1 className='app-title text-center my-2'>Async Race</h1>
      <Nav/>
      {view === 'garage' ? <Garage/> : <Winners/>}
      {/*<Garage/>*/}
      {/*/!*<Winners/>*!/*/}
    </div>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(App);