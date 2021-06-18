import "./car-container.scss";
import racingFlag from "../../assets/racing-flag.svg";
import React, {Ref, useEffect, useRef} from "react";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../actions";
import StateInterface from "../../interfaces/state-interface";
import {useContext} from "react";
import {AsyncRaceApiServiceContext} from "../async-race-api-service-context/async-race-api-service-context";
import store from "../../store";

// export const handlerUseRef = (ref: any) => {
//   return ref.current;
// }

// export const addAdditionalInfo = (id: number, getTrack: any, getImage: any, action: any) => {
//   const track = getTrack();
//   const carImg = getImage();
//   action(id, track, carImg);
// }

//FIXME: fix any type
const CarContainer = ({id, name, color, selectCar, removeCar, setAdditionalCarInfo, currentPage, carAmount,
                        getAllCarsAction, setCurrentCars, cars, currentCars}:
                        {
                          id: number, name: string, color: string, selectCar: any, removeCar: any,
                          setAdditionalCarInfo: any, currentPage: number, carAmount: number, getAllCarsAction: any,
                          setCurrentCars: any, cars: any, currentCars: any
                        }) => {

  const asyncRaceApiService = useContext(AsyncRaceApiServiceContext);

  const carTrack = useRef(null);
  const returnCarTrack = () => {
    return carTrack.current;
  }

  const carImage = useRef(null);
  const returnCarImage = () => {
    return carImage.current;
  }

  // addAdditionalInfo(id, returnCarTrack, returnCarImage, setAdditionalCarInfo);

  useEffect(() => {
    console.log('woork')
    const track = returnCarTrack();
    const carImg = returnCarImage();
    if (track && carImg) {
      setAdditionalCarInfo(id, track, carImg);
    }
  }, [carAmount, currentCars]);

  //TODO: move it to async-service or actions (mb need thunk)?
  return (
    <div>
      <div className='car-container__header d-flex align-items-center my-3'>
        <button className='btn btn-primary'
                onClick={() => selectCar(id)}>Select</button>
        <button className='btn btn-danger mx-2'
                onClick={() => {
                  removeCar(id);
                  asyncRaceApiService.deleteCar(id)
                    .then(() => asyncRaceApiService.updateCarList(currentPage));
                }
                }>Remove</button>
        <div className='car-container__car-name mx-3'>{name}</div>
      </div>
      <div className='car-container__track-container d-flex border-bottom align-items-end'>
        <button className='btn btn-sm btn-outline-success mb-2'
                onClick={() => asyncRaceApiService.startEngine(id, returnCarTrack()!, returnCarImage()!)}>Start</button>
        <button className='btn btn-sm btn-outline-warning mx-2 mb-2'
                onClick={() => asyncRaceApiService.stopEngine(id, returnCarImage()!)}>Stop</button>
        <div ref={carTrack} className='car-container__track d-flex'>
          <svg ref={carImage} className='car' width="594" height="239" viewBox="0 0 594 239" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M79.1043 60.302C91.5233 52.56 104.447 45.668 117.796 39.666L148.32 70.19H454.85C493.73 70.19 531.927 80.335 565.685 99.627C576.641 105.876 583.394 117.524 583.394 130.132V188.847H59.3283L27.2913 175.993C16.7803 171.791 9.88831 161.606 9.88831 150.284V70.19L79.1043 60.302Z"
              fill={color}/>
            <path
              d="M117.796 39.666C159.82 20.701 205.384 10.882 251.492 10.862H263.14C317.564 10.862 371.117 24.517 418.896 50.582L454.849 70.19H148.32L117.796 39.666Z"
              fill="#4394CC"/>
            <path d="M326.305 70.19H148.32L117.796 39.666C140.37 29.521 164.023 21.976 188.308 17.181L326.305 70.19Z"
                  fill="#3E89BD"/>
            <path d="M9.88831 89.966H49.4403V109.742H9.88831V89.966Z" fill="#F5AE45"/>
            <path
              d="M583.394 149.295V188.847H59.3283L27.2913 175.993C16.7803 171.791 9.88831 161.606 9.88831 150.284V149.295C9.88831 149.295 583.394 149.295 583.394 149.295Z"
              fill="#404040"/>
            <path
              d="M494.402 119.631C527.171 119.631 553.73 146.19 553.73 178.959C553.73 211.728 527.171 238.287 494.402 238.287C461.633 238.287 435.074 211.728 435.074 178.959C435.074 146.19 461.633 119.631 494.402 119.631Z"
              fill="#697B8C"/>
            <path
              d="M494.402 198.735C483.48 198.735 474.626 189.881 474.626 178.959C474.626 168.037 483.48 159.183 494.402 159.183C505.324 159.183 514.178 168.037 514.178 178.959C514.178 189.881 505.324 198.735 494.402 198.735Z"
              fill="#C3C9D1"/>
            <path
              d="M118.656 119.631C151.425 119.631 177.984 146.19 177.984 178.959C177.984 211.728 151.425 238.287 118.656 238.287C85.8873 238.287 59.3283 211.728 59.3283 178.959C59.3283 146.19 85.8873 119.631 118.656 119.631Z"
              fill="#697B8C"/>
            <path
              d="M118.656 198.735C107.734 198.735 98.8803 189.881 98.8803 178.959C98.8803 168.037 107.734 159.183 118.656 159.183C129.578 159.183 138.432 168.037 138.432 178.959C138.432 189.881 129.578 198.735 118.656 198.735Z"
              fill="#C3C9D1"/>
            <path d="M306.529 89.966H346.081V109.742H306.529V89.966Z" fill="black"/>
            <path
              d="M8.48431 60.401L75.6533 50.81C87.8943 43.285 100.61 36.551 113.712 30.638C156.992 11.04 203.96 0.924 251.472 0.974H263.14C319.215 1.014 374.39 15.084 423.633 41.901L457.529 60.392C497.21 60.837 536.119 71.387 570.599 91.045C584.61 99.073 593.252 113.984 593.282 130.132V188.847C593.282 194.305 588.852 198.735 583.394 198.735H550.19C539.392 229.546 505.664 245.762 474.853 234.965C457.895 229.022 444.566 215.693 438.623 198.735H174.444C163.646 229.546 129.918 245.762 99.1073 234.965C82.1493 229.022 68.8203 215.693 62.8773 198.735H59.3273C58.0713 198.735 56.8153 198.498 55.6493 198.033L23.6223 185.179C9.31431 179.513 -0.0596948 165.67 0.000305176 150.284V70.19C0.000305176 65.266 3.61931 61.103 8.48431 60.401ZM455.65 186.869C460.021 208.267 480.914 222.07 502.322 217.7C523.73 213.33 537.523 192.436 533.153 171.028C528.782 149.63 507.889 135.827 486.481 140.197C468.069 143.964 454.839 160.161 454.849 178.958C454.85 181.619 455.117 184.269 455.65 186.869ZM276.865 178.959H435.073C435.073 146.19 461.632 119.631 494.401 119.631C527.17 119.631 553.729 146.19 553.729 178.959H573.506V130.132C573.496 121.075 568.641 112.709 560.78 108.21C528.515 89.789 492.009 80.088 454.85 80.079H276.865V178.959V178.959ZM276.865 60.302H416.069L414.161 59.264C371.89 36.284 324.931 23.262 276.866 21.185V60.302H276.865ZM257.089 20.75H251.492C211.643 20.701 172.16 28.265 135.149 43.038L152.413 60.303H257.089V20.75ZM79.9053 186.869C84.2763 208.267 105.179 222.07 126.577 217.7C147.975 213.329 161.778 192.426 157.408 171.028C153.037 149.63 132.134 135.827 110.736 140.197C92.3253 143.964 79.0943 160.161 79.1043 178.958C79.1043 181.619 79.3713 184.269 79.9053 186.869ZM19.7763 89.966H49.4403V109.742H19.7763V150.283C19.7463 157.57 24.1963 164.126 30.9693 166.806L59.3283 178.197C59.3283 177.287 59.4473 176.388 59.5063 175.478C59.5653 174.568 59.5853 173.5 59.6843 172.512C59.7833 171.523 59.9813 170.534 60.1393 169.546C60.2973 168.557 60.4163 167.568 60.6143 166.669C60.8123 165.77 61.0993 164.771 61.3563 163.831C61.6133 162.892 61.8113 161.942 62.1073 161.023C62.4043 160.103 62.7603 159.223 63.0963 158.324C63.4323 157.424 63.7393 156.495 64.0853 155.605C64.4313 154.715 64.8963 153.904 65.3113 153.064C65.7263 152.224 66.1323 151.304 66.5963 150.454C67.0613 149.604 67.5853 148.882 68.0303 148.091C68.4753 147.3 69.0193 146.4 69.5823 145.589C70.1463 144.778 70.6703 144.135 71.2143 143.404C71.7583 142.672 72.3713 141.812 73.0043 141.051C73.6373 140.29 74.2303 139.696 74.8433 139.073C75.4563 138.45 76.1383 137.61 76.8213 136.917C77.5043 136.224 78.1763 135.681 78.8583 135.068C79.5403 134.455 80.2723 133.733 81.0243 133.09C81.7753 132.447 82.5373 131.953 83.2883 131.389C84.0393 130.825 84.7913 130.222 85.5823 129.698C86.3733 129.174 87.2633 128.709 88.1133 128.155C88.9633 127.601 89.6563 127.166 90.4563 126.741C91.2573 126.316 92.2563 125.871 93.1653 125.436C94.0753 125.001 94.7873 124.615 95.6273 124.259C96.4673 123.903 97.6053 123.527 98.5933 123.171C99.5813 122.815 100.225 122.538 101.065 122.271C102.192 121.925 103.349 121.678 104.496 121.391C105.247 121.213 105.969 120.976 106.731 120.817C107.947 120.57 109.193 120.431 110.429 120.253C111.161 120.154 111.863 119.996 112.594 119.927C114.572 119.729 116.549 119.62 118.626 119.62C151.375 119.65 177.925 146.199 177.954 178.948H257.088V80.078H148.32C145.7 80.078 143.178 79.04 141.329 77.181L115.689 51.541C104.921 56.663 94.4593 62.388 84.3443 68.687C83.1773 69.419 81.8723 69.893 80.5073 70.091L19.7753 78.763V89.966H19.7763Z"
              fill="black"/>
          </svg>
          <img className='racing-flag' src={racingFlag} alt='Finish'/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: StateInterface) => {
  return {
    currentPage: state.currentPage,
    carAmount: state.carAmount,
    cars: state.cars,
    currentCars: state.currentCars
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarContainer);