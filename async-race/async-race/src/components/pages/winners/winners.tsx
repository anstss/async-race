import "../pages.scss";
import React from "react";
import Winner from "../../winner/winner";
import StateInterface from "../../../interfaces/state-interface";
import {connect} from "react-redux";
import WinnersPagination from "../../pagination/winners-pagination";

//FIXME: fix any type
const Winners = ({winners, currentWinners, currentWinnersPage}: {winners: any, currentWinners: any, currentWinnersPage: number}) => {

  return (
    <div className='mb-5'>
      <h2 className='page__title'>Winners ({winners.length})</h2>
      <div className='page__pages'>Page №{currentWinnersPage}</div>
      <ul className='mt-2 px-0 list-unstyled'>
        <li className='navbar navbar-expand-lg navbar-dark bg-primary px-2'>
          <div className='navbar-brand col'>№</div>
          <div className='navbar-brand col'>Car</div>
          <div className='navbar-brand col'>Name</div>
          <div className='navbar-brand col interactive'
               onClick={() => console.log('click')}>Wins ↑↓</div>
          <div className='navbar-brand col interactive'>Best time (seconds) ↑↓</div>
        </li>
        {
          //FIXME: fix any type
          currentWinners.map((car: any) => {
            const winnersWithInfo = winners.find((elem: any) => elem.id === car.id);
            const {id, color, name, wins, time} = winnersWithInfo;
            //TODO: refactor
            const num = currentWinnersPage === 1 ? currentWinners.indexOf(car) + 1 : (currentWinners.indexOf(car) + 1) + ((currentWinnersPage - 1) * 10);
            return (
                <li key={id}>
                  <Winner num={num} color={color} name={name} wins={wins} bestTime={time}/>
                </li>
              )
            })
        }
      </ul>
      <WinnersPagination/>
    </div>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    winners: state.winners,
    currentWinners: state.currentWinners,
    currentWinnersPage: state.currentWinnersPage
  }
}

export default connect(mapStateToProps)(Winners);