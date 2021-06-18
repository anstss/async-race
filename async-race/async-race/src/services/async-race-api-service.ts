import TimerInterface from "../interfaces/timer-inteface";
import CarInterface from "../interfaces/car-interface";
import store from "../store";
import {showAndSetCurrentWinner, updateAllWinners, updateCarWins, setCarAndPageAmount} from "../actions";
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
        console.log(pageNumber)
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
        const startTime = Date.now();
        const step = (trackLength - carLength) / animationTime * 20;
        let currentPos = 0;
        let timer = window.setInterval(() => {
            let timePassed = Date.now() - startTime;
            if (timePassed >= animationTime) {
                // window.clearInterval(timer);
                this.clearAndDeleteCurrentCarTimer(id);
                return;
            }
            currentPos += step;
            carImage.style.transform = `translateX(${currentPos}px)`;
        }, 20);
        this.timers.push({
            timerId: `timerId${id}`,
            timer
        });
        if (!this.raceMode) {
            this.switchEngineToDriveMode(id, timer);
            return;
        }
        // if (this.hasWinner) return;
        const promise = this.switchEngineToDriveMode(id, timer);
        this.resultsSwitchEngine.push(promise);
        promise
          .then((result) => {
              if (result !== undefined) {
                  if (this.winnerId) return;
                  this.winnerId = id;
                  console.log('winner' + this.winnerId)
                  this.setNewWinner(id, animationTime);
              }
              return;
          })

        // carImage.style.transform = `translateX(${trackLength - carLength}px)`;
        // console.log(`Start animation. Id car: ${id}. Animation time: ${animationTime}.
        // Track length ${trackLength}. Car image ${carImage}. Car length ${carLength}`);
    }

    startEngine = async (id: number, trackElem: HTMLElement, carImage: HTMLElement) => {
        const response = await fetch(`${this.apiBaseEngine}?id=${id}&status=started`);
        const params = await response.json();
        const {velocity, distance} = params;
        const animationTime = distance / velocity;
        this.startAnimation(id, animationTime, trackElem, carImage);
    }

    stopEngine = async (id: number, carImage: HTMLElement) => {
        // const currentCarTimerIndex = this.findCurrentCarTimerIndex(id);
        const response = await fetch(`${this.apiBaseEngine}?id=${id}&status=stopped`);
        const result = await response.json();
        this.clearAndDeleteCurrentCarTimer(id);
        carImage.style.transform = 'translateX(0px)';
        // window.clearInterval(this.timers[currentCarTimerIndex].timer);
        // this.timers.splice(currentCarTimerIndex, 1);
    }

    switchEngineToDriveMode = async (id: number, timer: number) => {
        const response = await fetch(`${this.apiBaseEngine}?id=${id}&status=drive`);
        if (response.status === 500) {
            // window.clearInterval(timer);
            this.clearAndDeleteCurrentCarTimer(id);
            return;
        }
        return await response.json();
    }

    startRace = (cars: CarInterface[]) => {
        // const {id, carTrack, carImage}
        this.raceMode = true;
        cars.forEach((car) => this.startEngine(car.id, car.carTrack, car.carImage));
    }

    stopRace = (cars: CarInterface[]) => {
        this.raceMode = false;
        let stopAllCars: any = [];
        cars.forEach((car) => {
            stopAllCars.push(this.stopEngine(car.id, car.carImage))
        });
        console.log(this.resultsSwitchEngine.length)
        Promise.allSettled(stopAllCars).then(() => {
            Promise.allSettled(this.resultsSwitchEngine).then(() => {
                console.log('clear winner')
                this.resultsSwitchEngine.length = 0;
                this.winnerId = null;
                console.log('ALL STOPPED')
                console.log('HERE UNBLOCK RACE')
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
            console.log('need new winner');
            this.createWinner(id, wins, bestTime);
        }
        if (response.status === 200) {
            const winner = await response.json();
            bestTime = timeInSeconds < winner.time ? timeInSeconds : winner.time;
            wins = winner.wins + 1;
            this.updateWinner(id, wins, bestTime);
            console.log(winner);
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
       });
    }

   // setNextPage = () => {
   //
   // }
}
