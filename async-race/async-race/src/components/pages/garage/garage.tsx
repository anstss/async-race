import "../pages.scss";
import React from "react";
import CarSettings from "../../car-settings/car-settings";
import CarList from "../../car-list/car-list";
import {connect} from "react-redux";
import StateInterface from "../../../interfaces/state-interface";
import RaceWinner from "../../race-winner/race-winner";
import GaragePagination from "../../pagination/garage-pagination";

//FIXME: fix any type
const Garage = ({winner, carAmount, currentPage}: any) => {
  return (
    <div className='mb-5'>
      <CarSettings/>
      {winner === undefined ? null : winner === null ? null : <RaceWinner/>}
      <h2 className='page__title'>Garage ({carAmount})</h2>
      <div className='page__pages'>Page №{currentPage}</div>
      <CarList/>
      <GaragePagination/>
    </div>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    winner: state.currentWinner,
    carAmount: state.carAmount,
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps)(Garage);