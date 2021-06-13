import CarInterface from "./interfaces/car-interface";
import {AsyncRaceApiService} from "./services/async-race-api-service";
import store from "./store";
import {useContext} from "react";
import {AsyncRaceApiServiceContext} from "./components/async-race-api-service-context/async-race-api-service-context";

const asyncRaceApiService = new AsyncRaceApiService();

export const getAllCarsAction = (cars: CarInterface[]) => {
  return {
    type: 'GET_ALL_CARS',
    payload: cars
  }
}

export const getNameCreateCar = (target: HTMLInputElement) => {
  const name = target.value;
  return {
    type: 'GET_NAME_CREATE_CAR',
    payload: name
  }
}

export const getNameUpdateCar = (target: HTMLInputElement) => {
  const name = target.value;
  return {
    type: 'GET_NAME_UPDATE_CAR',
    payload: name
  }
}

export const getColorCreateCar = (target: HTMLInputElement) => {
  const color = target.value;
  return {
    type: 'GET_COLOR_CREATE_CAR',
    payload: color
  }
}

export const getColorUpdateCar = (target: HTMLInputElement) => {
  const color = target.value;
  return {
    type: 'GET_COLOR_UPDATE_CAR',
    payload: color
  }
}

// export const sendRequestCreateCar = async () => {
//   const {nameCreateCar, colorCreateCar} = store.getState();
//   const car = await asyncRaceApiService.createCar(nameCreateCar, colorCreateCar);
//   createCar(car);
// }

export const createCar = (car: CarInterface) => {
  console.log("YES")
  return {
    type: 'CREATE_CAR',
    payload: car
  }
}