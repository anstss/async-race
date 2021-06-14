import TimerInterface from "../interfaces/timer-inteface";
import CarInterface from "../interfaces/car-interface";

export class AsyncRaceApiService {
    private apiBase = 'http://127.0.0.1:3000';
    private apiBaseGarage = `${this.apiBase}/garage`;
    private apiBaseWinners = `${this.apiBase}/winners`;
    private apiBaseEngine = `${this.apiBase}/engine`;

    getAllCars = async () => {
        const response = await fetch(this.apiBaseGarage);
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

    // switchEngine = async (id: number, status: string) => {
    //     const response = await fetch(`${this.apiBaseEngine}?id=${id}&status=${status}`);
    //     return await response.json();
    // }
    timers: TimerInterface[] = [];

    private clearAndDeleteCurrentCarTimer = (id: number) => {
        const currentCarTimerIndex = this.timers.findIndex((timer) => timer.timerId === `timerId${id}`);
        if (currentCarTimerIndex !== -1) {
            window.clearInterval(this.timers[currentCarTimerIndex].timer);
            this.timers.splice(currentCarTimerIndex, 1);
        }
    }

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
        this.switchEngineToDriveMode(id, timer);
        this.timers.push({
            timerId: `timerId${id}`,
            timer
        });
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
        cars.forEach((car) => this.startEngine(car.id, car.carTrack, car.carImage));
    }

    getAllWinners = async () => {
        const response = await fetch(this.apiBaseWinners);
        return await response.json();
    }

    getWinner = async (id: number) => {
        const response = await fetch(`this.apiBaseWinners/${id}`);
        return await response.json();
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
}
