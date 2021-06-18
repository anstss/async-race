import React, {useContext} from "react";
import {connect} from "react-redux";
import StateInterface from "../../interfaces/state-interface";
import {AsyncRaceApiServiceContext} from "../async-race-api-service-context/async-race-api-service-context";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../actions";

//FIXME: fix any type
const WinnersPagination = ({
                            currentWinnersPage,
                            winnersPageAmount,
                            setCurrentWinners
                          }: { currentWinnersPage: number, winnersPageAmount: number, setCurrentWinners: any }) => {
  const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);

  const disabledPrev = currentWinnersPage === 1 ? 'disabled' : '' ;
  const disabledNext = currentWinnersPage === winnersPageAmount ? 'disabled' : '' ;

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${disabledPrev}`}>
          <button className="page-link"
                  onClick={() => {
                    asyncRaceApiService.getCurrentWinners(currentWinnersPage - 1)
                      .then((winners) => setCurrentWinners(winners));
                  }}>&laquo;</button>
        </li>
        <li className={`page-item ${disabledNext}`}>
          <button className="page-link"
                  onClick={() => {
                    asyncRaceApiService.getCurrentWinners(currentWinnersPage + 1)
                      .then((winners) => setCurrentWinners(winners));
                  }}>&raquo;</button>
        </li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    currentWinnersPage: state.currentWinnersPage,
    winnersPageAmount: state.winnersPageAmount,

  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WinnersPagination);