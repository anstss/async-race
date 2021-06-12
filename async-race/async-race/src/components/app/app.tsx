import './app.scss';
import React, {useContext} from 'react';
import Nav from "../nav/nav";
import Garage from "../pages/garage/garage";
import Winners from "../pages/winners/winners";
import Pagination from "../pagination/pagination";
import {AsyncRaceApiServiceContext} from "../async-race-api-service-context/async-race-api-service-context";

const App = () => {
  const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);
  // console.log(asyncRaceApiService.getAllCars());

  return (
    <div className='mx-5'>
      <h1 className='app-title text-center my-2'>Async Race</h1>
      <Nav/>
      <Garage/>
      {/*<Winners/>*/}
      <Pagination/>
    </div>
  )
}

export default App;