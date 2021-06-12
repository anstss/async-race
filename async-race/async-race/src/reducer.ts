import ActionsInterface from "./interfaces/actions-interface";
import StateInterface from "./interfaces/state-interface";

const initialState: StateInterface = {
  cars: []
}

//FIXME: fix any type
const reducer = (state = initialState, action: ActionsInterface<any>) => {
  switch (action.type) {
    case 'GET_ALL_CARS':
      return {
        ...state,
        cars: action.payload
      };

    default:
      return state;
  }
}

export default reducer;