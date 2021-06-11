import './app.scss';
import React from 'react';
import Nav from "../nav/nav";
import Garage from "../garage/garage";

const App = () => {
    return (
        <div className='mx-5'>
            <h1 className='app-title text-center my-2'>Async Race</h1>
            <Nav/>
            <Garage/>
        </div>
    )
}

export default App;