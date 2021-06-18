import React from "react";
import CarContainer from "../car-container/car-container";
import {connect} from "react-redux";
import StateInterface from "../../interfaces/state-interface";
import PropsInterface from "../../interfaces/props-interface";
import store from "../../store";
import CarInterface from "../../interfaces/car-interface";

const CarList = ({cars, currentCars}: {cars: CarInterface[], currentCars: CarInterface[]}) => {
  console.log(cars)
  console.log(currentCars)

  // const {cars} = store.getState();
  return (
    <ul className='list-unstyled'>
      {
        currentCars.map((car) => {
          const carWithInfo = cars.find((elem) => elem.id === car.id)
          const {name, color, id} = carWithInfo!;
          return (
            <li key={id}>
              <CarContainer name={name} color={color} id={id}/>
            </li>
          )
        })
      }
    </ul>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    cars: state.cars,
    currentCars: state.currentCars
  }
}

export default connect(mapStateToProps)(CarList);