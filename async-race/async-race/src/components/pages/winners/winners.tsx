import "../pages.scss";
import React, {useContext} from "react";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import Winner from "../../winner/winner";
import StateInterface from "../../../interfaces/state-interface";
import WinnersPagination from "../../pagination/winners-pagination";
import * as actions from "../../../actions";
import {AsyncRaceApiServiceContext} from "../../async-race-api-service-context/async-race-api-service-context";
import {SORT_BY_TIME, SORT_BY_WINS, WINNERS_PER_PAGE} from "../../../shared/constants";

const Winners = ({
                   winners,
                   currentWinners,
                   currentWinnersPage,
                 }: { winners: any, currentWinners: any, currentWinnersPage: number}) => {

  const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);


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
               onClick={() => asyncRaceApiService.sortBy(SORT_BY_WINS, currentWinnersPage)}>Wins ↑↓</div>
          <div className='navbar-brand col interactive'
               onClick={() => asyncRaceApiService.sortBy(SORT_BY_TIME, currentWinnersPage)}>Best time (seconds) ↑↓</div>
        </li>
        {
          currentWinners.map((car: any) => {
            const winnersWithInfo = winners.find((elem: any) => elem.id === car.id);
            if (!winnersWithInfo) {
              return null;
            }
            const {id, color, name, wins, time} = winnersWithInfo;
            const num = (currentWinners.indexOf(car) + 1) + ((currentWinnersPage - 1) * WINNERS_PER_PAGE);
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