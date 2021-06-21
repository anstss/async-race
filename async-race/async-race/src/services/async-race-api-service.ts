import TimerInterface from "../interfaces/timer-inteface";
import CarInterface from "../interfaces/car-interface";
import store from "../store";
import {
    showAndSetCurrentWinner,
    updateAllWinners,
    updateCarWins,
    setCarAndPageAmount,
    setWinnersAndWinnersPageAmount,
    setCurrentWinners, removeCar, getAllCarsAction, setCurrentCars, setAdditionalCarInfo, addActiveCar, removeActiveCar,
    setCarPosition, clearCarPosition, /*clearActiveCars*/
} from "../actions";
import {Dispatch} from "redux";

export class AsyncRaceApiService {
    private apiBase = 'http://127.0.0.1:3000';
    private apiBaseGarage = `${this.apiBase}/garage`;
    private apiBaseWinners = `${this.apiBase}/winners`;
    private apiBaseEngine = `${this.apiBase}/engine`;

    //TODO: defaultPageLimit to const
    getAllCars = async () => {
        const response = await fetch(this.apiBaseGarage);
        return await response.json();
    }

    getCurrentCars = async (pageNumber: number) => {
        const response = await fetch(`${this.apiBaseGarage}?_page=${pageNumber}&_limit=7`);
        const carsAmount = Number(response.headers.get("X-Total-Count"));
        const pageAmount = Math.ceil(carsAmount / 7);
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
        // await this.getAllCars().then((cars) => store.dispatch(getAllCarsAction(cars)));
        // await this.getCurrentCars(store.getState().currentPage).then((cars) => setCurrentCars(cars));
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
        // console.log(trackElem)
        const trackLength = trackElem.offsetWidth;
        const carLength = carImage.getBoundingClientRect().width;
        const startTime = Date.now();
        // console.log('START')
        // console.log(startTime)
        // console.log('animationTime ID')
        // console.log(animationTime + ' ' + id)
        const step = (trackLength - carLength) / animationTime * 20;
        // console.log('track length')
        // console.log(trackLength)
        // console.log('car length')
        // console.log(carLength)
        // console.log('animationTime')
        // console.log(animationTime)
        // console.log('step')
        // console.log(step)

        let currentPos = 0;
        let timer = window.setInterval(() => {
            currentPos += step;
            let timePassed = Date.now() - startTime;
            if (currentPos >= (trackLength - carLength)) {
                // window.clearInterval(timer);
                // console.log('timePassed ID')
                // console.log(timePassed + ' ' + id)
                this.clearAndDeleteCurrentCarTimer(id);
                if (this.raceMode) {
                    if (this.winnerId) return;
                    this.winnerId = id;
                    // console.log('winner' + this.winnerId)
                    this.setNewWinner(id, animationTime);
                }
                return;
            }

            // console.log(currentPos)
            store.dispatch(setCarPosition(id, currentPos));
            // carImage.style.transform = `translateX(${currentPos}px)`;
        }, 20);
        this.timers.push({
            timerId: `timerId${id}`,
            timer
        });
        // if (!this.raceMode) {
        //     console.log('switch')
        //     this.switchEngineToDriveMode(id, timer);
        //     return;
        // }
        // if (this.hasWinner) return;
        this.switchEngineToDriveMode(id, timer);
        // const promise = this.switchEngineToDriveMode(id, timer);
        // this.resultsSwitchEngine.push(promise);
        // promise
        //   .then((result) => {
        //       if (result !== undefined) {
        //           if (this.winnerId) return;
        //           this.winnerId = id;
        //           console.log('winner' + this.winnerId)
        //           this.setNewWinner(id, animationTime);
        //       }
        //       return;
        //   })

        // carImage.style.transform = `translateX(${trackLength - carLength}px)`;
        // console.log(`Start animation. Id car: ${id}. Animation time: ${animationTime}.
        // Track length ${trackLength}. Car image ${carImage}. Car length ${carLength}`);
    }

    startEngine = async (id: number, trackElem: HTMLElement, carImage: HTMLElement) => {
        store.dispatch(addActiveCar(id));
        const response = await fetch(`${this.apiBaseEngine}?id=${id}&status=started`);
        const params = await response.json();
        const {velocity, distance} = params;
        const animationTime = distance / velocity;
        // console.log(trackElem)
        this.startAnimation(id, animationTime, trackElem, carImage);
    }

    stopEngine = async (id: number, carImage: HTMLElement) => {
        // const currentCarTimerIndex = this.findCurrentCarTimerIndex(id);
        const response = await fetch(`${this.apiBaseEngine}?id=${id}&status=stopped`);
        const result = await response.json();

        this.clearAndDeleteCurrentCarTimer(id);
        store.dispatch(removeActiveCar(id));
        store.dispatch(clearCarPosition(id));
        carImage.style.transform = 'translateX(0px)';
        // window.clearInterval(this.timers[currentCarTimerIndex].timer);
        // this.timers.splice(currentCarTimerIndex, 1);
    }

    switchEngineToDriveMode = async (id: number, timer: number) => {
        // console.log('switched 1')
        const response = await fetch(`${this.apiBaseEngine}?id=${id}&status=drive`);
        // console.log('switched 2')
        if (response.status === 500) {
            // window.clearInterval(timer);
            this.clearAndDeleteCurrentCarTimer(id);
            return;
        }
        return await response.json();
    }
    //TODO: REFACTOR - Transformed cars!!!
    startRace = async (cars: CarInterface[]) => {
        // store.dispatch(switchStoreRaceMode());
        const carsWithAdditionalInfo = store.getState().cars;
        // console.log(carsWithAdditionalInfo)
        const transformedCars = cars.map((car) => {
            const carInfo = carsWithAdditionalInfo.find((elem) => elem.id === car.id);
            return {
                ...carInfo
            }
        });
        // console.log(transformedCars)
        this.raceMode = true;
        transformedCars.forEach((car) => this.startEngine(car.id!, car.carTrack!, car.carImage!));
    }

    stopRace = (cars: CarInterface[]) => {
        this.raceMode = false;
        let stopAllCars: any = [];
        const carsWithAdditionalInfo = store.getState().cars;
        const transformedCars = cars.map((car) => {
            const carInfo = carsWithAdditionalInfo.find((elem) => elem.id === car.id);
            return {
                ...carInfo
            }
        });
        transformedCars.forEach((car) => {
            stopAllCars.push(this.stopEngine(car.id!, car.carImage!))
        });
        // console.log(this.resultsSwitchEngine.length)
        Promise.allSettled(stopAllCars).then(() => {
            Promise.allSettled(this.resultsSwitchEngine).then(() => {
                // console.log('clear winner')
                this.resultsSwitchEngine.length = 0;
                this.winnerId = null;
                // store.dispatch(clearActiveCars());
                // console.log(store.getState().activeCars)
                // console.log('ALL STOPPED')
                // console.log('HERE UNBLOCK RACE')
                // store.dispatch(switchStoreRaceMode());
            })
        });
    }

    getAllWinners = async () => {
        const response = await fetch(this.apiBaseWinners);
        return await response.json();
    }
    // getWinner = async (id: number) => {
    //     const response = await fetch(`this.apiBaseWinners/${id}`);
    //     return await response.json();
    // }

    setNewWinner = async (id: number, time: number) => {
        const response = await fetch(`${this.apiBaseWinners}/${id}`);
        const timeInSeconds = Math.floor(time) / 1000;
        let bestTime = timeInSeconds;
        let wins = 1;
        if (response.status === 404) {
            // console.log('need new winner');
            this.createWinner(id, wins, bestTime);
        }
        if (response.status === 200) {
            const winner = await response.json();
            bestTime = timeInSeconds < winner.time ? timeInSeconds : winner.time;
            wins = winner.wins + 1;
            this.updateWinner(id, wins, bestTime);
            // console.log(winner);
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

   //Middleware thunk ?
   updateWinners = () => {
        let winnersCars: {name: string, wins: number, time: number, id: number, color: string}[] = [];
        let transformedWinners: any[] = [];
       return this.getAllWinners().then((cars: any) => {
           winnersCars = [...cars];
           const carsWithAdditionalInfo = store.getState().cars;
           transformedWinners = winnersCars.map((car: {wins: number, time: number, id: number}) => {
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

   // TODO: default limit to const
   getCurrentWinners = async (pageNumber: number) => {
       const sortBy = store.getState().sortBy;
       const order = store.getState().order;
       const response = await fetch(`${this.apiBaseWinners}?_page=${pageNumber}&_limit=10&_sort=${sortBy}&_order=${order}`);
       const winnersAmount = Number(response.headers.get("X-Total-Count"));
       const winnersPageAmount = Math.ceil(winnersAmount / 10);
       store.dispatch(setWinnersAndWinnersPageAmount(winnersAmount, winnersPageAmount, pageNumber));
       return await response.json();
   }

   updateCarList = async (currentPage: number) => {
       await this.getAllCars()
         .then((cars) => {
             store.dispatch(getAllCarsAction(cars));
             this.getCurrentCars(currentPage)
               .then((cars) => store.dispatch(setCurrentCars(cars)));
         });
   }
}
