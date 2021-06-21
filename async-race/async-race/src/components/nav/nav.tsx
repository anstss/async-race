import React, {useContext, useEffect} from "react";
import {connect} from "react-redux";
import StateInterface from "../../interfaces/state-interface";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../actions";
import {AsyncRaceApiServiceContext} from "../async-race-api-service-context/async-race-api-service-context";

const Nav = ({showView, currentPage, cars, carsPositions, winners, setCurrentWinners, currentWinnersPage}: any) => {

  const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);
  //TODO: refactor!!!
  //TODO: process update winners to func
  return (
    <nav className='nav d-flex justify-content-center my-3'>
      <button className='btn btn-primary btn-lg mx-3'
              onClick={() => {
                showView('garage');
                // asyncRaceApiService.getCurrentCars(currentPage)
                //   .then((currentCars) => {
                //     const withSavedPositions = currentCars.map((car: any) => {
                //       const carWithImg = cars.find((elem: any) => elem.id === car.id);
                //       const carWithPosition = carsPositions.find((elem: any) => elem.id === car.id);
                //       console.log(carWithImg)
                //       return {
                //         ...carWithImg,
                //         carPosition: carWithPosition.carPosition
                //       }
                //     });
                //
                //   })
              }
              }>
        Garage
      </button>
      <button className='btn btn-primary btn-lg mx-3'
              onClick={() => {
                showView('winners');
                asyncRaceApiService.updateWinners()
                  .then(() => {
                    asyncRaceApiService.getCurrentWinners(currentWinnersPage)
                      .then((winners) => {
                        setCurrentWinners(winners);
                      })
                  });
              }
              }>
        Winners
      </button>
    </nav>
  )
}

const mapStateToProps = ({cars, currentPage, currentWinnersPage, carsPositions}: StateInterface) => {
  return {
    cars,
    currentPage,
    currentWinnersPage,
    carsPositions
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);