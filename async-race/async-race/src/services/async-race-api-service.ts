import TimerInterface from "../interfaces/timer-inteface";
import CarInterface from "../interfaces/car-interface";
import store from "../store";
import {
    showAndSetCurrentWinner,
    updateAllWinners,
    updateCarWins,
    setCarAndPageAmount,
    setWinnersAndWinnersPageAmount,
    setCurrentWinners, getAllCarsAction, setCurrentCars, addActiveCar, removeActiveCar,
    setCarPosition, clearCarPosition, removeCar, createCar, updateCar, createHundredCars, changeSortBy
} from "../actions";
import {generateRandCarName, generateRandColor} from "../shared/utils";
import {ANIMATION_INTERVAL_MS, CARS_PER_PAGE, WINNERS_PER_PAGE} from "../shared/constants";

export class AsyncRaceApiService {
    private apiBase = 'http://127.0.0.1:3000';
    private apiBaseGarage = `${this.apiBase}/garage`;
    private apiBaseWinners = `${this.apiBase}/winners`;
    private apiBaseEngine = `${this.apiBase}/engine`;

    getAllCars = async () => {
        const response = await fetch(this.apiBaseGarage);
        return await response.json();
    }

    getCurrentCars = async (pageNumber: number) => {
        const response = await fetch(`${this.apiBaseGarage}?_page=${pageNumber}&_limit=${CARS_PER_PAGE}`);
        const carsAmount = Number(response.headers.get("X-Total-Count"));
        const pageAmount = Math.ceil(carsAmount / CARS_PER_PAGE);
        store.dispatch(setCarAndPageAmount(carsAmount, pageAmount, pageNumber));
        return await response.json();
    }

    getCar = async (id: number) => {
        const response = await fetch(`${this.apiBaseGarage}/${id}`);
        return await response.json();
    }

    createCar = async (carName: string, carColor: string) => {
        const data = {
            name: carName,
            color: carColor
        };
        const response = await fetch(this.apiBaseGarage, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    deleteCar = async (id: number) => {
        const response = await fetch(`${this.apiBaseGarage}/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    }

    updateCar = async (id: number, name: string, color: string) => {
        const data = {
            name,
            color
        }
        const response = await fetch(`${this.apiBaseGarage}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    private timers: TimerInterface[] = [];

    private clearAndDeleteCurrentCarTimer = (id: number) => {
        const currentCarTimerIndex = this.timers.findIndex((timer) => timer.timerId === `timerId${id}`);
        if (currentCarTimerIndex !== -1) {
            window.clearInterval(this.timers[currentCarTimerIndex].timer);
            this.timers.splice(currentCarTimerIndex, 1);
        }
    }

    private raceMode = false;
    private winnerId: number | null = null;
    private resultsSwitchEngine: Promise<any>[] = [];

    private startAnimation = (id: number, animationTime: number, trackElem: HTMLElement, carImage: HTMLElement) => {
        const trackLength = trackElem.offsetWidth;
        const carLength = carImage.getBoundingClientRect().width;
        const step = (trackLength - carLength) / animationTime * ANIMATION_INTERVAL_MS;
        let currentPos = 0;
        let timer = window.setInterval(() => {
            currentPos += step;
            if (currentPos >= (trackLength - carLength)) {
                this.clearAndDeleteCurrentCarTimer(id);
                if (this.raceMode) {
                    if (this.winnerId) return;
                    this.winnerId = id;
                    this.setNewWinner(id, animationTime);
                }
                return;
            }
            store.dispatch(setCarPosition(id, currentPos));
        }, ANIMATION_INTERVAL_MS);
        this.timers.push({
            timerId: `timerId${id}`,
            timer
        });
        this.switchEngineToDriveMode(id);
    }

    startEngine = async (id: number, trackElem: HTMLElement, carImage: HTMLElement) => {
        store.dispatch(addActiveCar(id));
        const response = await fetch(`${this.apiBaseEngine}?id=${id}&status=started`);
        const params = await response.json();
        const {velocity, distance} = params;
        const animationTime = distance / velocity;
        this.startAnimation(id, animationTime, trackElem, carImage);
    }

    stopEngine = async (id: number) => {
        const response = await fetch(`${this.apiBaseEngine}?id=${id}&status=stopped`);
        const result = await response.json();
        this.clearAndDeleteCurrentCarTimer(id);
        store.dispatch(removeActiveCar(id));
        store.dispatch(clearCarPosition(id));
    }

    switchEngineToDriveMode = async (id: number) => {
        const response = await fetch(`${this.apiBaseEngine}?id=${id}&status=drive`);
        if (response.status === 500) {
            this.clearAndDeleteCurrentCarTimer(id);
            return;
        }
        return await response.json();
    }

    private transformCars = (cars: CarInterface[]) => {
        const carsWithAdditionalInfo = store.getState().cars;
        return cars.map((car) => {
            const carInfo = carsWithAdditionalInfo.find((elem) => elem.id === car.id);
            return {
                ...carInfo
            }
        });
    }

    startRace = async (cars: CarInterface[]) => {
        const transformedCars = this.transformCars(cars);
        this.raceMode = true;
        transformedCars.forEach((car) => this.startEngine(car.id!, car.carTrack!, car.carImage!));
    }

    stopRace = (cars: CarInterface[]) => {
        this.raceMode = false;
        let stopAllCars: any = [];
        const transformedCars = this.transformCars(cars);
        transformedCars.forEach((car) => {
            stopAllCars.push(this.stopEngine(car.id!))
        });
        Promise.allSettled(stopAllCars).then(() => {
            Promise.allSettled(this.resultsSwitchEngine).then(() => {
                this.resultsSwitchEngine.length = 0;
                this.winnerId = null;
            })
        });
    }

    getAllWinners = async () => {
        const response = await fetch(this.apiBaseWinners);
        return await response.json();
    }

    setNewWinner = async (id: number, time: number) => {
        const response = await fetch(`${this.apiBaseWinners}/${id}`);
        const timeInSeconds = Math.floor(time) / 1000;
        let bestTime = timeInSeconds;
        let wins = 1;
        if (response.status === 404) {
            this.createWinner(id, wins, bestTime);
        }
        if (response.status === 200) {
            const winner = await response.json();
            bestTime = timeInSeconds < winner.time ? timeInSeconds : winner.time;
            wins = winner.wins + 1;
            this.updateWinner(id, wins, bestTime);
        }
        store.dispatch(updateCarWins(id, wins, bestTime));
        store.dispatch(showAndSetCurrentWinner(id, timeInSeconds));
    }

    createWinner = async (id: number, wins: number, time: number) => {
        const data = {
            id,
            wins,
            time
        };
        const response = await fetch(this.apiBaseWinners, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    deleteWinner = async (id: number) => {
        const response = await fetch(`${this.apiBaseWinners}/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    }

    updateWinner = async (id: number, wins: number, time: number) => {
        const data = {
            wins,
            time
        };
        const response = await fetch(`${this.apiBaseWinners}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

   //Middleware thunk ? (for async in actions)
    updateWinners = () => {
        let winnersCars: { name: string, wins: number, time: number, id: number, color: string }[] = [];
        let transformedWinners: any[] = [];
        return this.getAllWinners().then((cars: any) => {
            winnersCars = [...cars];
            const carsWithAdditionalInfo = store.getState().cars;
            transformedWinners = winnersCars.map((car: { wins: number, time: number, id: number }) => {
                const carInfo = carsWithAdditionalInfo.find((elem: any) => elem.id === car.id);
                return {
                    wins: car.wins,
                    time: car.time,
                    id: car.id,
                    color: carInfo!.color,
                    name: carInfo!.name
                }
            })
            store.dispatch(updateAllWinners(transformedWinners));
            store.dispatch(setCurrentWinners(transformedWinners));
        });
    }

   getCurrentWinners = async (pageNumber: number) => {
       const sortBy = store.getState().sortBy;
       const order = store.getState().order;
       const response = await fetch(`${this.apiBaseWinners}?_page=${pageNumber}&_limit=${WINNERS_PER_PAGE}&_sort=${sortBy}&_order=${order}`);
       const winnersAmount = Number(response.headers.get("X-Total-Count"));
       const winnersPageAmount = Math.ceil(winnersAmount / WINNERS_PER_PAGE);
       store.dispatch(setWinnersAndWinnersPageAmount(winnersAmount, winnersPageAmount, pageNumber));
       return await response.json();
   }

    updateCarList = (currentPage: number) => {
        this.getAllCars()
          .then((cars) => {
              store.dispatch(getAllCarsAction(cars));
              this.getCurrentCars(currentPage)
                .then((cars) => store.dispatch(setCurrentCars(cars)));
          });
    }

   removeCarFromGarageAndWinners = (id: number, currentPage: number) => {
       store.dispatch(removeCar(id));
       this.deleteCar(id)
         .then(() => this.updateCarList(currentPage));
       this.deleteWinner(id);
   }

    sendRequestCreateCar = async (currentPage: number) => {
        const {nameCreateCar, colorCreateCar} = store.getState();
        const car = await this.createCar(nameCreateCar, colorCreateCar);
        store.dispatch(createCar(car));
        this.updateCarList(currentPage);
    }

    sendRequestUpdateCar = async (currentPage: number) => {
        const {selectedCar, nameUpdateCar, colorUpdateCar} = store.getState();
        const car = await this.updateCar(selectedCar!, nameUpdateCar, colorUpdateCar);
        store.dispatch(updateCar());
        this.updateCarList(currentPage);
    }

    createOneHundredCars = (currentPage: number) => {
        for (let i = 0; i < 100; i++) {
            const carName = generateRandCarName();
            const carColor = generateRandColor();
            this.createCar(carName, carColor);
        }
        this.getAllCars()
          .then((cars) => {
              store.dispatch(createHundredCars(cars));
              this.updateCarList(currentPage);
          });
    }

    showWinners = (currentWinnersPage: number) => {
        this.updateWinners()
          .then(() => {
              this.getCurrentWinners(currentWinnersPage)
                .then((winners) => {
                    store.dispatch(setCurrentWinners(winners));
                });
          });
    }

    sortBy = (sortBy: string, currentWinnersPage: number) => {
        store.dispatch(changeSortBy(sortBy));
        this.getCurrentWinners(currentWinnersPage)
          .then((winners) => {
              store.dispatch(setCurrentWinners(winners));
          });
    }

    showPrevGaragePage = (currentPage: number) => {
        this.getCurrentCars(currentPage - 1)
          .then((cars) => store.dispatch(setCurrentCars(cars)));
    }

    showNextGaragePage = (currentPage: number) => {
        this.getCurrentCars(currentPage + 1)
          .then((cars) => store.dispatch(setCurrentCars(cars)));
    }

    showPrevWinnersPage = (currentWinnersPage: number) => {
        this.getCurrentWinners(currentWinnersPage - 1)
          .then((winners) => store.dispatch(setCurrentWinners(winners)));
    }

    showNextWinnersPage = (currentWinnersPage: number) => {
        this.getCurrentWinners(currentWinnersPage + 1)
          .then((winners) => store.dispatch(setCurrentWinners(winners)));
    }

}
