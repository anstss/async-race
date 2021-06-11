import './app.scss';
import React from 'react';
import Nav from "../nav/nav";
import CarSettings from "../car-settings/car-settings";
import CarContainer from "../car-container/car-container";

const App = () => {
    return (
        <div className='mx-5'>
            <h1 className='app-title text-center my-2'>Async Race</h1>
            <Nav/>
            <CarSettings/>
            <CarContainer carName='Tesla' carColor='red'/>
        </div>
    )
}

export default App;