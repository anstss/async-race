import './app.scss';
import React from 'react';
import Nav from "../nav/nav";
import CarSettings from "../car-settings/car-settings";

const App = () => {
    return (
        <div className='mx-5'>
            <h1 className='app-title text-center my-2'>Async Race</h1>
            <Nav/>
            <CarSettings/>
            My App
            <button className='btn btn-primary'>Test</button>
            <img className='car' src='./car.svg'/>
        </div>
    )
}

export default App;