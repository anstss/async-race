import ActionsInterface from "./interfaces/actions-interface";
import StateInterface from "./interfaces/state-interface";

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
  pageLimit: 7,
  carAmount: 0,
  pageAmount: 1,
  currentCars: [],
  currentWinners: [],
  currentWinnersPage: 1,
  winnersPageAmount: 1,
  sortBy: 'wins',
  order: 'ASC',
  // raceMode: false,
  activeCars: [],
  //TODO: uncomment it
  // carsPositions: []
  //TODO: uncomment it
}

//FIXME: fix any type
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
      return {
        ...state,
        selectedCar: action.payload.id,
        nameUpdateCar: action.payload.name,
        colorUpdateCar: action.payload.color
      }
    //TODO: findCarIndex()
    case 'UPDATE_CAR':
      const carId = action.payload;
      const carIndex = state.cars.findIndex((car) => car.id === carId);
      const updatedCar = {
        id: carId,
        name: state.nameUpdateCar,
        color: state.colorUpdateCar
      }
      return {
        ...state,
        cars: [
          ...state.cars.slice(0, carIndex),
          updatedCar,
          ...state.cars.slice(carIndex + 1)
        ]
      }
    case 'REMOVE_CAR':
      const id = action.payload;
      const index = state.cars.findIndex((car) => car.id === id);
      return {
        ...state,
        cars: [
          ...state.cars.slice(0, index),
          ...state.cars.slice(index + 1)
        ]
      }
    case 'CREATE_HUNDRED_CARS':
      return {
        ...state,
        cars: action.payload
      }
    //TODO: findCarIndex, updateCars
    case 'SET_ADDITIONAL_CAR_INFO':
      const {id: carID, carTrack, carImage} = action.payload;
      const carInd = state.cars.findIndex((car) => car.id === carID);
      const carWithAdditionalInfo = {
        ...state.cars[carInd],
        carTrack,
        carImage
      }
      return {
        ...state,
        cars: [
          ...state.cars.slice(0, carInd),
          carWithAdditionalInfo,
          ...state.cars.slice(carInd + 1)
        ]
      }
    case 'UPDATE_CAR_WINS':
      const {id: winnerId, wins, bestTime} = action.payload;
      const winnerInd = state.cars.findIndex((car) => car.id === winnerId);
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
      const {id: winId, time} = action.payload;
      const winnerIndex = state.cars.findIndex((car) => car.id === winId);
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
    //  TODO: rename
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
    //  TODO: rename
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

    // case 'SWITCH_STORE_RACE_MODE':
    //   return {
    //     ...state,
    //     raceMode: !state.raceMode
    //   }

    case 'ADD_ACTIVE_CAR':
      const activeCarId = action.payload;
      // console.log(state.activeCars) //TODO: uncomment it
      return {
        ...state,
        activeCars: [...state.activeCars, activeCarId]
      }
    case 'REMOVE_ACTIVE_CAR':
      const remoteCarId = action.payload;
      const remoteCarIndex = state.activeCars.findIndex((id) => id === remoteCarId);
      return {
        ...state,
        activeCars: [
          ...state.activeCars.slice(0, remoteCarIndex),
          ...state.activeCars.slice(remoteCarIndex + 1)
        ]
      }

    case 'CHANGE_SORT_BY':
      const sortBy = action.payload;
      const currentOrder = state.order;
      const newOrder = currentOrder === 'ASC' ? 'DESC' : 'ASC';
      return {
        ...state,
        sortBy,
        order: newOrder
      }

    //TODO: uncomment it
    // //  FIXME: BAG HERE!!!!!!
    // case 'SET_CAR_POSITION':
    //   const {id: carIdPos, currentPosition} = action.payload;
    //   const currentPos = {
    //     id: carIdPos,
    //     currentPosition
    //   }
    //   console.log(state.carsPositions)
    //   // console.log(carIdPos)
    //   const prevPos = state.carsPositions.findIndex(({id}) => id === carIdPos);
    //   console.log(prevPos)
    //   if (prevPos) {
    //     return {
    //       ...state,
    //       carsPositions: [
    //         ...state.carsPositions.slice(0, prevPos),
    //         currentPos,
    //         ...state.carsPositions.slice(prevPos + 1)
    //       ]
    //     }
    //   }
    //   return {
    //     ...state,
    //     carsPositions: [
    //       ...state.carsPositions,
    //       currentPos
    //     ]
    //   }
    //
    // case 'CLEAR_CAR_POSITION':
    //   const clearId = action.payload;
    //   const clearIndex = state.carsPositions.findIndex(({id}) => id === clearId);
    //   const clearedPosition = {
    //     id: clearId,
    //     currentPosition: 0
    //   }
    //   return {
    //     ...state,
    //     carsPositions: [
    //       ...state.carsPositions.slice(0, clearIndex),
    //       clearedPosition,
    //       ...state.carsPositions.slice(clearIndex + 1)
    //     ]
    //   }
//TODO: uncomment it

    default:
      return state;
  }
}

export default reducer;