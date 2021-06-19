import {carModels} from "./car-models";
import store from "../store";

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