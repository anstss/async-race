import CarInterface from "./car-interface";

export default interface StateInterface {
  cars: CarInterface[] | [],
  nameCreateCar: string,
  nameUpdateCar: string,
  colorCreateCar: string,
  colorUpdateCar: string,
  selectedCar: number | null
}