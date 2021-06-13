import CarInterface from "./interfaces/car-interface";
import {AsyncRaceApiService} from "./services/async-race-api-service";
import store from "./store";

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
  return {
    type: 'CREATE_CAR',
    payload: car
  }
}

//TODO: findCar()
export const selectCar = (id: number) => {
  const cars = store.getState().cars;
  const car = cars.find(car => car.id === id);
  return {
    type: 'SELECT_CAR',
    payload: car
  }
}

export const updateCar = () => {
  const currentCarId = store.getState().selectedCar;
  // const cars = store.getState().cars;
  // const currentCar = cars.find(car => car.id === currentCarId);
  return {
    type: 'UPDATE_CAR',
    payload: currentCarId
  }
}

export const removeCar = (id: number) => {
  asyncRaceApiService.deleteCar(id);
  return {
    type: 'REMOVE_CAR',
    payload: id
  }
}