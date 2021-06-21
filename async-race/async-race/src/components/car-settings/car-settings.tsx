import './car-settings.scss';
import React, {useContext, useRef} from "react";
import {connect} from "react-redux";
import StateInterface from "../../interfaces/state-interface";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../actions";
import store from "../../store";
import {AsyncRaceApiService} from "../../services/async-race-api-service";
import {AsyncRaceApiServiceContext} from "../async-race-api-service-context/async-race-api-service-context";
import {generateRandCarName, generateRandColor} from "../../shared/utils";
import CarInterface from "../../interfaces/car-interface";

//FIXME: fix any type
const CarSettings = ({ cars, currentCars, currentPage,
                       getNameCreateCar, getNameUpdateCar,
                       getColorCreateCar, getColorUpdateCar,
                       createCar, nameUpdateCar, colorUpdateCar,
                       updateCar, createHundredCars, activeCars,
                       nameCreateCar, colorCreateCar
                     }: any) => {

  const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);
  //TODO: handler => export getColor()
  const nameInputCreateCar = useRef(null);
  const handlerOnChangeNameCreateCar = () => {
    // console.log(store.getState())
    return nameInputCreateCar.current
  };

  const nameInputUpdateCar = useRef(null);
  const handlerOnChangeNameUpdateCar = () => {
    // console.log(store.getState())
    return nameInputUpdateCar.current
  };

  const colorInputCreateCar = useRef(null);
  const handlerOnChangeColorCreateCar = () => {
    // console.log(store.getState())
    return colorInputCreateCar.current
  };

  const colorInputUpdateCar = useRef(null);
  const handlerOnChangeColorUpdateCar = () => {
    // console.log(store.getState())
    return colorInputUpdateCar.current
  };
  //TODO: move requests to actions
  const sendRequestCreateCar = async () => {
    const {nameCreateCar, colorCreateCar} = store.getState();
    const car = await asyncRaceApiService.createCar(nameCreateCar, colorCreateCar);
    createCar(car);
    asyncRaceApiService.updateCarList(currentPage);
  }

  const sendRequestUpdateCar = async () => {
    const {selectedCar, nameUpdateCar, colorUpdateCar} = store.getState();
    const car = await asyncRaceApiService.updateCar(selectedCar!, nameUpdateCar, colorUpdateCar);
    updateCar(car);
    asyncRaceApiService.updateCarList(currentPage);
  }

  const createOneHundredCars = () => {
    for (let i = 0; i < 100; i++) {
      const carName = generateRandCarName();
      const carColor = generateRandColor();
      asyncRaceApiService.createCar(carName, carColor);
    }
    // let allCars: CarInterface[] = [];
    asyncRaceApiService.getAllCars()
      .then((cars) => {
        createHundredCars(cars);
        asyncRaceApiService.updateCarList(currentPage);
      });
  }

  //TODO: Car setting!!!!
  return (
    <div className='mt-4'>
      <div className='car-setting form-group d-flex justify-content-center my-3'>
        <input ref={nameInputCreateCar} type='text'
               value={nameCreateCar}
               className='form-control car-setting__input col-xs-2 mx-3' placeholder='Enter car name'
               onInput={() => getNameCreateCar(handlerOnChangeNameCreateCar())}/>
        <input ref={colorInputCreateCar} type='color' className='form-control car-setting__color col-xs-2'
               value={colorCreateCar}
               onChange={() => getColorCreateCar(handlerOnChangeColorCreateCar())}/>
        <button className='btn btn-primary mx-3 btn-size-normal'
                onClick={() => sendRequestCreateCar()}>Create new car</button>
      </div>
      <div className='car-setting form-group d-flex justify-content-center my-3'>
        <input ref={nameInputUpdateCar} type='text'
               value={nameUpdateCar}
               className='form-control car-setting__input col-xs-2 mx-3' placeholder='Enter new car name'
               onInput={() => getNameUpdateCar(handlerOnChangeNameUpdateCar())}/>
        <input ref={colorInputUpdateCar} type='color' className='form-control car-setting__color col-xs-2'
               value={colorUpdateCar}
               onChange={() => getColorUpdateCar(handlerOnChangeColorUpdateCar())}/>
        <button className='btn btn-primary mx-3 btn-size-normal'
                onClick={() => sendRequestUpdateCar()}>Update car</button>
      </div>
      <div className='d-flex justify-content-center'>
        <button className='btn btn-success mx-3 btn-size-sm' disabled={activeCars.length ? true : false}
                onClick={() => asyncRaceApiService.startRace(currentCars)}>Race</button>
        <button className='btn btn-primary btn-size-sm' disabled={activeCars.length ? false : true}
                onClick={() => asyncRaceApiService.stopRace(currentCars)}>Reset</button>
        <button className='btn btn-info mx-3 btn-size-lg'
                onClick={() => createOneHundredCars()}>Generate cars</button>
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
    // raceMode: state.raceMode,
    activeCars: state.activeCars,
    nameCreateCar: state.nameCreateCar,
    colorCreateCar: state.colorCreateCar
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarSettings);