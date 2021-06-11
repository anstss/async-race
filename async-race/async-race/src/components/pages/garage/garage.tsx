import "../pages.scss";
import React from "react";
import CarSettings from "../../car-settings/car-settings";
import CarContainer from "../../car-container/car-container";

const Garage = () => {
    return (
        <div className='mb-5'>
            <CarSettings/>
            <h2 className='page__title'>Garage (337)</h2>
            <div className='page__pages'>Page №3</div>
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