import "../pages.scss";
import React, {useContext} from "react";
import Winner from "../../winner/winner";
import StateInterface from "../../../interfaces/state-interface";
import {connect} from "react-redux";
import WinnersPagination from "../../pagination/winners-pagination";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../../actions";
import {AsyncRaceApiServiceContext} from "../../async-race-api-service-context/async-race-api-service-context";

//FIXME: fix any type
const Winners = ({
                   winners,
                   currentWinners,
                   currentWinnersPage,
                   changeSortBy,
                   setCurrentWinners,
                 }: { winners: any, currentWinners: any, currentWinnersPage: number, changeSortBy: any,
                   setCurrentWinners: any}) => {

  const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);

  //TODO: REFACTOR: sortby to const
  //TODO: REFACTOR: move func from render pls (and remove copy-paste)
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
               onClick={() => {
                 changeSortBy('wins');
                 asyncRaceApiService.getCurrentWinners(currentWinnersPage)
                   .then((winners) => {
                     setCurrentWinners(winners);
                   })
               }
               }>Wins ↑↓</div>
          <div className='navbar-brand col interactive'
               onClick={() => {
                 changeSortBy('time');
                 asyncRaceApiService.getCurrentWinners(currentWinnersPage)
                   .then((winners) => {
                     setCurrentWinners(winners);
                   })
               }}>Best time (seconds) ↑↓</div>
        </li>
        {
          //FIXME: fix any type
          currentWinners.map((car: any) => {
            const winnersWithInfo = winners.find((elem: any) => elem.id === car.id);
            if (!winnersWithInfo) {
              return null;
            }
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Winners);