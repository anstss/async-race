import "../pages.scss";
import React from "react";
import Winner from "../../winner/winner";
import StateInterface from "../../../interfaces/state-interface";
import {connect} from "react-redux";

const Winners = ({winners}: {winners: any}) => {

  return (
    <div className='mb-5'>
      <h2 className='page__title'>Winners (7)</h2>
      <div className='page__pages'>Page №5</div>
      <ul className='mt-2 px-0 list-unstyled'>
        <li className='navbar navbar-expand-lg navbar-dark bg-primary px-2'>
          <div className='navbar-brand col'>№</div>
          <div className='navbar-brand col'>Car</div>
          <div className='navbar-brand col'>Name</div>
          <div className='navbar-brand col'>Wins</div>
          <div className='navbar-brand col'>Best time (seconds)</div>
        </li>
        {
          //FIXME: fix any type
          winners.map((car: any) => {
              const {id, color, name, wins, time} = car;
              return (
                <li key={id}>
                  <Winner color={color} name={name} wins={wins} bestTime={time}/>
                </li>
              )
            })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    winners: state.winners
  }
}

export default connect(mapStateToProps)(Winners);