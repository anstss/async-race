import CarInterface from "./interfaces/car-interface";
import {AsyncRaceApiService} from "./services/async-race-api-service";
import store from "./store";
import {getCarIndex} from "./shared/utils";

const asyncRaceApiService = new AsyncRaceApiService();

export const showView = (view: string) => {
  return {
    type: 'SHOW_VIEW',
    payload: view
  }
}

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

export const createCar = (car: CarInterface) => {
  return {
    type: 'CREATE_CAR',
    payload: car
  }
}

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
  const currentCarIndex = getCarIndex(currentCarId!);
  return {
    type: 'UPDATE_CAR',
    payload: {
      currentCarId,
      currentCarIndex
    }
  }
}

export const removeCar = (id: number) => {
  asyncRaceApiService.deleteCar(id);
  const deletedCarIndex = getCarIndex(id);
  return {
    type: 'REMOVE_CAR',
    payload: deletedCarIndex
  }
}

export const createHundredCars = (cars: CarInterface[]) => {
  return {
    type: 'CREATE_HUNDRED_CARS',
    payload: cars
  }
}

export const setAdditionalCarInfo = (id: number, carTrack: HTMLElement, carImage: HTMLElement) => {
  const carIndex = getCarIndex(id);
   return {
     type: 'SET_ADDITIONAL_CAR_INFO',
     payload: {carIndex, carTrack, carImage}
   }
};

export const updateCarWins = (id: number, wins: number, bestTime: number) => {
  const winnerIndex = getCarIndex(id);
  return {
    type: 'UPDATE_CAR_WINS',
    payload: {winnerIndex, wins, bestTime}
  }
}

export const showAndSetCurrentWinner = (id: number, time: number) => {
  const winnerIndex = getCarIndex(id);
  return {
    type: 'SHOW_AND_SET_CURRENT_WINNER',
    payload: {winnerIndex, time}
  }
}

export const hideAndClearCurrentWinner = () => {
  return {
    type: 'HIDE_AND_CLEAR_CURRENT_WINNER'
  }
}

export const updateAllWinners = (transformedWinners: any) => {
  return {
    type: 'UPDATE_ALL_WINNERS',
    payload: transformedWinners
  }
}

export const setCarAndPageAmount = (carAmount: number, pageAmount: number, pageNumber: number) => {
  return {
    type: 'SET_CAR_AND_PAGE_AMOUNT',
    payload: {
      carAmount,
      pageAmount,
      pageNumber
    }
  }
}

export const setCurrentCars = (cars: CarInterface[]) => {
  return {
    type: 'SET_CURRENT_CARS',
    payload: cars
  }
}

export const setWinnersAndWinnersPageAmount = (winnersAmount: number, winnersPageAmount: number, pageNumber: number) => {
  return {
    type: 'SET_WINNERS_AND_WINNERS_PAGE_AMOUNT',
    payload: {
      winnersAmount,
      winnersPageAmount,
      currentWinnersPage: pageNumber
    }
  }
}

export const setCurrentWinners = (winners: any) => {
  return {
    type: 'SET_CURRENT_WINNERS',
    payload: winners
  }
}

export const addActiveCar = (id: number) => {
  return {
    type: 'ADD_ACTIVE_CAR',
    payload: id
  }
}

export const removeActiveCar = (id: number) => {
  // const remoteCarIndex = getCarIndex(id);
  // console.log(remoteCarIndex)
  return {
    type: 'REMOVE_ACTIVE_CAR',
    payload: id
  }
}

export const changeSortBy = (sortBy: string) => {
  return {
    type: 'CHANGE_SORT_BY',
    payload: sortBy
  }
}


export const setCarPosition = (id: number, currentPosition: number) => {
  return {
    type: 'SET_CAR_POSITION',
    payload: {
      id,
      currentPosition
    }
  }
}

export const clearCarPosition = (id: number) => {
  return {
    type: 'CLEAR_CAR_POSITION',
    payload: id
  }
}
