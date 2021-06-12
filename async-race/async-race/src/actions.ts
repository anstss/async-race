import CarInterface from "./interfaces/car-interface";

export const getAllCarsAction = (cars: CarInterface[]) => {
  return {
    type: 'GET_ALL_CARS',
    payload: cars
  }
}
