import React, {useContext} from "react";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import StateInterface from "../../interfaces/state-interface";
import {AsyncRaceApiServiceContext} from "../async-race-api-service-context/async-race-api-service-context";
import * as actions from "../../actions";

const WinnersPagination = ({
                            currentWinnersPage,
                            winnersPageAmount,
                          }: { currentWinnersPage: number, winnersPageAmount: number}) => {

  const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);

  const disabledPrev = currentWinnersPage === 1 ? 'disabled' : '' ;
  const disabledNext = currentWinnersPage === winnersPageAmount ? 'disabled' : '' ;

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${disabledPrev}`}>
          <button className="page-link"
                  onClick={() => asyncRaceApiService.showPrevWinnersPage(currentWinnersPage)}>&laquo;</button>
        </li>
        <li className={`page-item ${disabledNext}`}>
          <button className="page-link"
                  onClick={() => asyncRaceApiService.showNextWinnersPage(currentWinnersPage)}>&raquo;</button>
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