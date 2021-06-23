import {carModels} from "./car-models";
import store from "../store";
import CarPositionInterface from "../interfaces/car-position-interface";

export const generateRandColor = () => {
  let r = Math.floor(Math.random() * 256).toString(16);
  let g = Math.floor(Math.random() * 256).toString(16);
  let b = Math.floor(Math.random() * 256).toString(16);
  if (r.length === 1) r = '0' + r;
  if (g.length === 1) g = '0' + g;
  if (b.length === 1) b = '0' + b;
  return `#${r}${g}${b}`;
}

export const generateRandCarName = () => {
  const firstNameIndex = Math.floor(Math.random() * carModels.length);
  const copyWithoutFirstName = [...carModels];
  copyWithoutFirstName.splice(firstNameIndex, 1);
  const lastNameIndex = Math.floor(Math.random() * copyWithoutFirstName.length);
  return `${carModels[firstNameIndex]} ${copyWithoutFirstName[lastNameIndex]}`;
}

export const checkIsActiveCar = (id: number) => {
  const activeCars = store.getState().activeCars;
  return activeCars.find((activeCarId: number) => activeCarId === id);
}

export const returnCurrentRef = (ref: any) => {
  return ref.current;
}

export const getPosition = (id: number, carsPositions: CarPositionInterface[]) => {
  const currentElem = carsPositions.find((elem: CarPositionInterface) => elem.id === id);
  if (currentElem) {
    return currentElem.currentPosition;
  }
}

export const getCarIndex = (id: number) => {
  return store.getState().cars.findIndex((car) => car.id === id);
}

