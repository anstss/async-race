import './app.scss';
import React from 'react';
import Nav from "../nav/nav";
import Garage from "../pages/garage/garage";
import Winners from "../pages/winners/winners";

const App = () => {
    return (
        <div className='mx-5'>
            <h1 className='app-title text-center my-2'>Async Race</h1>
            <Nav/>
            {/*<Garage/>*/}
            <Winners/>
        </div>
    )
}

export default App;