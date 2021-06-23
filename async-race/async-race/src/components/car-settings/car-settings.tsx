import './car-settings.scss';
import React, {useContext, useRef} from "react";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import StateInterface from "../../interfaces/state-interface";
import * as actions from "../../actions";
import {AsyncRaceApiServiceContext} from "../async-race-api-service-context/async-race-api-service-context";
import {returnCurrentRef} from "../../shared/utils";

const CarSettings = ({ currentCars, currentPage,
                       getNameCreateCar, getNameUpdateCar,
                       getColorCreateCar, getColorUpdateCar,
                       nameUpdateCar, colorUpdateCar,
                       activeCars, nameCreateCar, colorCreateCar
                     }: any) => {

  const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);

  const nameInputCreateCar = useRef(null);
  const colorInputCreateCar = useRef(null);
  const nameInputUpdateCar = useRef(null);
  const colorInputUpdateCar = useRef(null);


  return (
    <div className='mt-4'>
      <div className='car-setting form-group d-flex justify-content-center my-3'>
        <input ref={nameInputCreateCar} type='text'
               value={nameCreateCar}
               className='form-control car-setting__input col-xs-2 mx-3' placeholder='Enter car name'
               onInput={() => getNameCreateCar(returnCurrentRef(nameInputCreateCar))}/>
        <input ref={colorInputCreateCar} type='color' className='form-control car-setting__color col-xs-2'
               value={colorCreateCar}
               onChange={() => getColorCreateCar(returnCurrentRef(colorInputCreateCar))}/>
        <button className='btn btn-primary mx-3 btn-size-normal'
                onClick={() => asyncRaceApiService.sendRequestCreateCar(currentPage)}>Create new car</button>
      </div>
      <div className='car-setting form-group d-flex justify-content-center my-3'>
        <input ref={nameInputUpdateCar} type='text'
               value={nameUpdateCar}
               className='form-control car-setting__input col-xs-2 mx-3' placeholder='Enter new car name'
               onInput={() => getNameUpdateCar(returnCurrentRef(nameInputUpdateCar))}/>
        <input ref={colorInputUpdateCar} type='color' className='form-control car-setting__color col-xs-2'
               value={colorUpdateCar}
               onChange={() => getColorUpdateCar(returnCurrentRef(colorInputUpdateCar))}/>
        <button className='btn btn-primary mx-3 btn-size-normal'
                onClick={() => asyncRaceApiService.sendRequestUpdateCar(currentPage)}>Update car</button>
      </div>
      <div className='d-flex justify-content-center'>
        <button className='btn btn-success mx-3 btn-size-sm' disabled={activeCars.length ? true : false}
                onClick={() => asyncRaceApiService.startRace(currentCars)}>Race</button>
        <button className='btn btn-primary btn-size-sm' disabled={activeCars.length ? false : true}
                onClick={() => asyncRaceApiService.stopRace(currentCars)}>Reset</button>
        <button className='btn btn-info mx-3 btn-size-lg'
                onClick={() => asyncRaceApiService.createOneHundredCars(currentPage)}>Generate cars</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    cars: state.cars,
    nameUpdateCar: state.nameUpdateCar,
    colorUpdateCar: state.colorUpdateCar,
    currentPage: state.currentPage,
    currentCars: state.currentCars,
    activeCars: state.activeCars,
    nameCreateCar: state.nameCreateCar,
    colorCreateCar: state.colorCreateCar
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarSettings);