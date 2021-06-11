import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";
import {AsyncRaceApiService} from "./services/async-race-api-service";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const api = new AsyncRaceApiService();
// console.log(api.getAllCars());