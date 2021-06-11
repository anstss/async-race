import React from "react";
import CarSetting from "../car-setting/car-setting";

const CarSettings = () => {
    return (
        <div className='mt-5'>
            <CarSetting placeholder='Enter car name' buttonText='Create new car'/>
            <CarSetting placeholder='Enter new car name' buttonText='Update car'/>
        </div>
    )
}

export default CarSettings;