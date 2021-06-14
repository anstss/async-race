import ActionsInterface from "./interfaces/actions-interface";
import StateInterface from "./interfaces/state-interface";

const initialState: StateInterface = {
  view: 'garage',
  cars: [],
  nameCreateCar: '',
  nameUpdateCar: '',
  colorCreateCar: '#000000',
  colorUpdateCar: '#000000',
  selectedCar: null
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

    default:
      return state;
  }
}

export default reducer;