import React from "react";
import {AsyncRaceApiService} from "../../services/async-race-api-service";

export const AsyncRaceApiServiceContext = React.createContext(new AsyncRaceApiService());
