import "../pages.scss";
import React, {useContext, useEffect} from "react";
import Winner from "../../winner/winner";
import StateInterface from "../../../interfaces/state-interface";
import CarInterface from "../../../interfaces/car-interface";
import {connect} from "react-redux";
import store from "../../../store";
import {AsyncRaceApiService} from "../../../services/async-race-api-service";

//TODO: refactor!!!
const asyncRaceApiService = new AsyncRaceApiService();
let winnersCars: {name: string, wins: number, time: number, id: number, color: string}[] = [];
console.log(store.getState().cars)
asyncRaceApiService.getAllWinners().then((cars) => winnersCars = [...cars]);

const Winners = ({cars: allCars}: {cars: CarInterface[]}) => {
  const carsWithAdditionalInfo = store.getState().cars;
  const transformedWinners = winnersCars.map((car: {wins: number, time: number, id: number}) => {
    console.log(carsWithAdditionalInfo)
    const carInfo = carsWithAdditionalInfo.find((elem) => elem.id === car.id);
    return {
      wins: car.wins,
      time: car.time,
      id: car.id,
      color: carInfo!.color,
      name: carInfo!.name
    }
  })

  return (
    <div className='mb-5'>
      <h2 className='page__title'>Winners (7)</h2>
      <div className='page__pages'>Page №5</div>
      <ul className='mt-2 px-0 list-unstyled'>
        <li className='navbar navbar-expand-lg navbar-dark bg-primary px-2'>
          <div className='navbar-brand col'>№</div>
          <div className='navbar-brand col'>Car</div>
          <div className='navbar-brand col'>Name</div>
          <div className='navbar-brand col'>Wins</div>
          <div className='navbar-brand col'>Best time (seconds)</div>
        </li>
        {
          transformedWinners.map((car) => {
              const {id, color, name, wins, time} = car;
              return (
                <li key={id}>
                  <Winner color={color} name={name} wins={wins} bestTime={time}/>
                </li>
              )
            })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    cars: state.cars
  }
}

export default connect(mapStateToProps)(Winners);