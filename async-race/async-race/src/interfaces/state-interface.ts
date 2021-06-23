import CarInterface from "./car-interface";
import CurrentWinnerInterface from "./current-winner-interface";

export default interface StateInterface {
  view: string,
  cars: CarInterface[] | [],
  nameCreateCar: string,
  nameUpdateCar: string,
  colorCreateCar: string,
  colorUpdateCar: string,
  selectedCar: number | null,
  currentWinner: CurrentWinnerInterface | null,
  winners: any,
  currentPage: number,
  pageLimit: number,
  carAmount: number,
  pageAmount: number,
  currentCars: CarInterface[] | [],
  currentWinners: any,
  currentWinnersPage: number,
  winnersPageAmount: number,
  sortBy: string,
  order: string,
  activeCars: any[] | [],
  carsPositions: any[] | []
}