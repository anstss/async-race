import "./garage.scss";
import React from "react";
import CarSettings from "../car-settings/car-settings";
import CarContainer from "../car-container/car-container";

const Garage = () => {
    return (
        <div>
            <CarSettings/>
            <h2 className='garage__title'>Garage (337)</h2>
            <div className='garage__page'>Page №3</div>
            <CarContainer carName='Tesla' carColor='red'/>
            <CarContainer carName='BMW' carColor='yellow'/>
            <CarContainer carName='Ford' carColor='white'/>
            <CarContainer carName='Tesla' carColor='blue'/>
            <CarContainer carName='BMW' carColor='black'/>
            <CarContainer carName='Ford' carColor='gray'/>
            <CarContainer carName='Tesla' carColor='green'/>
        </div>
    )
}
export default Garage