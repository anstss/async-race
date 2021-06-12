import React from "react";
import CarContainer from "../car-container/car-container";
import {connect} from "react-redux";
import StateInterface from "../../interfaces/state-interface";

const CarList = ({cars}: StateInterface) => {
  return (
    <ul className='list-unstyled'>
      {
        cars.map((car) => {
          const {name, color, id} = car;
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
    cars: state.cars
  }
}

export default connect(mapStateToProps)(CarList);