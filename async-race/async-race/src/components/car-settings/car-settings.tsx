import './car-settings.scss';
import React from "react";
import CarSetting from "../car-setting/car-setting";

const CarSettings = () => {
    return (
        <div className='mt-4'>
            <CarSetting placeholder='Enter car name' buttonText='Create new car'/>
            <CarSetting placeholder='Enter new car name' buttonText='Update car'/>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-success mx-3 btn-size-sm'>Race</button>
                <button className='btn btn-primary btn-size-sm'>Reset</button>
                <button className='btn btn-info mx-3 btn-size-lg'>Generate cars</button>
            </div>
        </div>
    )
}

export default CarSettings;