import CarInterface from "./car-interface";
import ActionsInterface from "./actions-interface";

export default interface PropsInterface {
  cars: CarInterface[] | [],
  colorCreateCar: string,
  getColorCreateCar: ActionsInterface<string>
}