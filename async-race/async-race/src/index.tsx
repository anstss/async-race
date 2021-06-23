import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./store";
import App from "./components/app/app";
import {AsyncRaceApiService} from "./services/async-race-api-service";
import {AsyncRaceApiServiceContext} from "./components/async-race-api-service-context/async-race-api-service-context";

const asyncRaceApiService = new AsyncRaceApiService();

asyncRaceApiService.updateCarList(1);
asyncRaceApiService.showWinners(1);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AsyncRaceApiServiceContext.Provider value={asyncRaceApiService}>
        <App/>
      </AsyncRaceApiServiceContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);