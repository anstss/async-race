import './car-setting.scss';
import React from "react";
import CarSettingPropsInterface from "../../interfaces/car-setting-props-interface";

const CarSetting = ({placeholder, buttonText}: CarSettingPropsInterface) => {
  return (
    <div className='car-setting form-group d-flex justify-content-center my-3'>
      <input type='text' className='form-control car-setting__input col-xs-2 mx-3' placeholder={placeholder}/>
      <input type='color' className='form-control car-setting__color col-xs-2'/>
      <button className='btn btn-primary mx-3 btn-size-normal'>{buttonText}</button>
    </div>
  )
}

export default CarSetting;