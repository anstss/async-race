import ActionsInterface from "./interfaces/actions-interface";
import StateInterface from "./interfaces/state-interface";
import {CARS_PER_PAGE} from "./shared/constants";

const initialState: StateInterface = {
  view: 'garage',
  cars: [],
  nameCreateCar: '',
  nameUpdateCar: '',
  colorCreateCar: '#000000',
  colorUpdateCar: '#000000',
  selectedCar: null,
  currentWinner: null,
  winners: null,
  currentPage: 1,
  pageLimit: CARS_PER_PAGE,
  carAmount: 0,
  pageAmount: 1,
  currentCars: [],
  currentWinners: [],
  currentWinnersPage: 1,
  winnersPageAmount: 1,
  sortBy: 'wins',
  order: 'ASC',
  activeCars: [],
  carsPositions: []
}

const reducer = (state = initialState, action: ActionsInterface<any>) => {
  switch (action.type) {

    case 'SHOW_VIEW':
      return {
        ...state,
        view: action.payload
      };

    case 'GET_ALL_CARS':
      return {
        ...state,
        cars: action.payload
      };

    case 'GET_NAME_CREATE_CAR':
      return {
        ...state,
        nameCreateCar: action.payload
      }

    case 'GET_NAME_UPDATE_CAR':
      return {
        ...state,
        nameUpdateCar: action.payload
      }

    case 'GET_COLOR_CREATE_CAR':
      return {
        ...state,
        colorCreateCar: action.payload
      };

    case 'GET_COLOR_UPDATE_CAR':
      return {
        ...state,
        colorUpdateCar: action.payload
      }

    case 'CREATE_CAR':
      return {
        ...state,
        cars: [...state.cars, action.payload]
      }

    case 'SELECT_CAR':
      const {id: selectedCarId, name, color} = action.payload;
      return {
        ...state,
        selectedCar: selectedCarId,
        nameUpdateCar: name,
        colorUpdateCar: color
      }

    case 'UPDATE_CAR':
      const {currentCarId, currentCarIndex} = action.payload;
      const updatedCar = {
        id: currentCarId,
        name: state.nameUpdateCar,
        color: state.colorUpdateCar
      }
      return {
        ...state,
        cars: [
          ...state.cars.slice(0, currentCarIndex),
          updatedCar,
          ...state.cars.slice(currentCarIndex + 1)
        ]
      }

    case 'REMOVE_CAR':
      const deletedCarIndex = action.payload;
      return {
        ...state,
        cars: [
          ...state.cars.slice(0, deletedCarIndex),
          ...state.cars.slice(deletedCarIndex + 1)
        ]
      }

    case 'CREATE_HUNDRED_CARS':
      return {
        ...state,
        cars: action.payload
      }

    case 'SET_ADDITIONAL_CAR_INFO':
      const {carIndex, carTrack, carImage} = action.payload;
      const carWithAdditionalInfo = {
        ...state.cars[carIndex],
        carTrack,
        carImage
      }
      return {
        ...state,
        cars: [
          ...state.cars.slice(0, carIndex),
          carWithAdditionalInfo,
          ...state.cars.slice(carIndex + 1)
        ]
      }

    case 'UPDATE_CAR_WINS':
      const {winnerIndex: winnerInd, wins, bestTime} = action.payload;
      const winner = {
        ...state.cars[winnerInd],
        wins,
        bestTime
      }
      return {
        ...state,
        cars: [
          ...state.cars.slice(0, winnerInd),
          winner,
          ...state.cars.slice(winnerInd + 1)
        ]
      }

    case 'SHOW_AND_SET_CURRENT_WINNER':
      const {winnerIndex, time} = action.payload;
      return {
        ...state,
        currentWinner: {
          ...state.cars[winnerIndex],
          winTime: time
        }
      }

    case 'HIDE_AND_CLEAR_CURRENT_WINNER':
      return {
        ...state,
        currentWinner: null
      }

    case 'UPDATE_ALL_WINNERS':
      return {
        ...state,
        winners: action.payload
      }

    case 'SET_CAR_AND_PAGE_AMOUNT':
      const {carAmount, pageAmount, pageNumber} = action.payload;
      return {
        ...state,
        carAmount,
        pageAmount,
        currentPage: pageNumber
      }

    case 'SET_CURRENT_CARS':
      return {
        ...state,
        currentCars: action.payload
      }

    case 'SET_WINNERS_AND_WINNERS_PAGE_AMOUNT':
      const {winnersAmount, winnersPageAmount, currentWinnersPage} = action.payload;
      return {
        ...state,
        winnersAmount,
        winnersPageAmount,
        currentWinnersPage
      }

    case 'SET_CURRENT_WINNERS':
      return {
        ...state,
        currentWinners: action.payload
      }

    case 'ADD_ACTIVE_CAR':
      const activeCarId = action.payload;
      return {
        ...state,
        activeCars: [...state.activeCars, activeCarId]
      }

    case 'REMOVE_ACTIVE_CAR':
      const remoteCarId = action.payload;
      const remoteCarIndex = state.activeCars.findIndex((id) => id === remoteCarId);
      if (remoteCarIndex > -1) {
        return {
          ...state,
          activeCars: [
            ...state.activeCars.slice(0, remoteCarIndex),
            ...state.activeCars.slice(remoteCarIndex + 1)
          ]
        }
      }
      return state;

    case 'CHANGE_SORT_BY':
      const sortBy = action.payload;
      const currentOrder = state.order;
      const newOrder = currentOrder === 'ASC' ? 'DESC' : 'ASC';
      return {
        ...state,
        sortBy,
        order: newOrder
      }

    case 'SET_CAR_POSITION':
      const {id: carIdPos, currentPosition} = action.payload;
      const currentPos = {
        id: carIdPos,
        currentPosition
      }
      const prevPos = state.carsPositions.findIndex(({id}) => id === carIdPos);
      if (prevPos > -1) {
        return {
          ...state,
          carsPositions: [
            ...state.carsPositions.slice(0, prevPos),
            currentPos,
            ...state.carsPositions.slice(prevPos + 1)
          ]
        }
      }
      return {
        ...state,
        carsPositions: [
          ...state.carsPositions,
          currentPos
        ]
      }

    case 'CLEAR_CAR_POSITION':
      const clearId = action.payload;
      const clearIndex = state.carsPositions.findIndex(({id}) => id === clearId);
      const clearedPosition = {
        id: clearId,
        currentPosition: 0
      }
      return {
        ...state,
        carsPositions: [
          ...state.carsPositions.slice(0, clearIndex),
          clearedPosition,
          ...state.carsPositions.slice(clearIndex + 1)
        ]
      }

    default:
      return state;
  }
}

export default reducer;