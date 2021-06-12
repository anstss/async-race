export default interface ActionsInterface<T> {
  type: string,
  payload?: T
}

// import CarInterface from "./car-interface";
//
// export default interface ActionsInterface {
//   type: string,
//   payload?: CarInterface[]
// }