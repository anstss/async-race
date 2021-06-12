import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";
import {AsyncRaceApiService} from "./services/async-race-api-service";
import {Provider} from "react-redux";
import store from "./store";
import {AsyncRaceApiServiceContext} from "./components/async-race-api-service-context/async-race-api-service-context";
import * as actions from "./actions";
import {bindActionCreators} from "redux";

const asyncRaceApiService = new AsyncRaceApiService();

const {getAllCarsAction} = bindActionCreators(actions, store.dispatch);

asyncRaceApiService.getAllCars().then((cars) => {
  getAllCarsAction(cars);
});

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