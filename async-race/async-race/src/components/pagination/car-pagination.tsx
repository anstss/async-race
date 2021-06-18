import React, {useContext} from "react";
import {connect} from "react-redux";
import StateInterface from "../../interfaces/state-interface";
import {AsyncRaceApiServiceContext} from "../async-race-api-service-context/async-race-api-service-context";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../actions";

//FIXME: fix any type
const CarPagination = ({
                      currentPage,
                      pageAmount,
                      setCurrentCars
                    }: { currentPage: number, pageAmount: number, setCurrentCars: any }) => {
  const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);

  const disabledPrev = currentPage === 1 ? 'disabled' : '' ;
  const disabledNext = currentPage === pageAmount ? 'disabled' : '' ;

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${disabledPrev}`}>
          <button className="page-link"
                  onClick={() => {
                    asyncRaceApiService.getCurrentCars(currentPage - 1)
                      .then((cars) => setCurrentCars(cars));
                  }}>&laquo;</button>
        </li>
        <li className={`page-item ${disabledNext}`}>
          <button className="page-link"
                  onClick={() => {
                    asyncRaceApiService.getCurrentCars(currentPage + 1)
                      .then((cars) => setCurrentCars(cars));
                  }}>&raquo;</button>
        </li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    currentPage: state.currentPage,
    pageAmount: state.pageAmount
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarPagination);