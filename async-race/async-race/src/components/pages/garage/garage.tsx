import "../pages.scss";
import React from "react";
import CarSettings from "../../car-settings/car-settings";
import CarList from "../../car-list/car-list";

const Garage = () => {
  return (
    <div className='mb-5'>
      <CarSettings/>
      <h2 className='page__title'>Garage (337)</h2>
      <div className='page__pages'>Page №3</div>
      <CarList/>
    </div>
  )
}
export default Garage