import "../pages.scss";
import React from "react";
import CarSettings from "../../car-settings/car-settings";
import CarList from "../../car-list/car-list";
import {connect} from "react-redux";
import StateInterface from "../../../interfaces/state-interface";
import RaceWinner from "../../race-winner/race-winner";

//FIXME: fix any type
const Garage = ({winner}: any) => {
  return (
    <div className='mb-5'>
      <CarSettings/>
      {winner === undefined ? null : winner === null ? null : <RaceWinner/>}
      <h2 className='page__title'>Garage (337)</h2>
      <div className='page__pages'>Page №3</div>
      <CarList/>
    </div>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    winner: state.currentWinner
  }
}

export default connect(mapStateToProps)(Garage);