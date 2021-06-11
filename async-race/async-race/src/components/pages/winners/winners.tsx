import "../pages.scss";
import React from "react";
import Winner from "../../winner/winner";

const Winners = () => {
    return (
        <div className='mb-5'>
            <h2 className='page__title'>Winners (7)</h2>
            <div className='page__pages'>Page №5</div>
            <div className='mt-2'>
                <div className='navbar navbar-expand-lg navbar-dark bg-primary px-2'>
                    <div className='navbar-brand col'>Number</div>
                    <div className='navbar-brand col'>Car</div>
                    <div className='navbar-brand col'>Name</div>
                    <div className='navbar-brand col'>Wins</div>
                    <div className='navbar-brand col'>Best time (seconds)</div>
                </div>
                <Winner/>
                <Winner/>
                <Winner/>
                <Winner/>
                <Winner/>
                <Winner/>
                <Winner/>
                <Winner/>
                <Winner/>
                <Winner/>
            </div>
        </div>
    )
}

export default Winners;