import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { connect } from "react-redux";
import { addToCart } from "../Redux/cartReducer";
import {Link} from 'react-router-dom';
import '../Style/Camera.scss'
import axios from 'axios';

function Camera(props) {
  const [data, setData] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (data.length > 12) {
      axios
      .get(`/api/getItem/${data}`)
      .then(res => {
        props.addToCart(res.data);
        setData("");
        props.history.push("/cart");
      })
      .catch(err => {
        alert('UPC is not in the system')
        setData("");
      })
    }
  }, [data]);


    return(
      <div className="cameraContainer">
         {props.cartReducer.cart[0]?
         <img onClick={() => {props.history.push('/cart')}} src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/xIcon-DarkBlue.svg" alt="exit" className="x-Icon" />:
        // <span className='camera-exit' onClick={() => {props.history.push('/cart')}}>&#10005;</span>:
        <img onClick={() => {props.history.push('/instructions')}} src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/xIcon-DarkBlue.svg" alt="exit" class="x-Icon" />}
        {/* <span className='camera-exit' onClick={() => {props.history.push('/instructions')}}>&#10005;</span>} */}
        <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/updatedLogo+USE+ME.svg" alt="scan & go" className="scango" />
        <h5 className="scangotxt">SCAN AND GO</h5>
        {toggle?
        <>
        <p>Enter the UPC</p>
        <input
          value={data}
          onChange={(e) => setData(e.target.value)}/></>:
        <>
          <BarcodeScannerComponent className="BarcodeScanner"
            width={'100%'}
            height={300}
            // height={'70%'}
            onUpdate={(err, result) => {
              if (result) {
                setData(result.text);
              }
            }}
            />
          </>}
          <br></br>
          {toggle?
          <button class="camera-toggle" onClick={() => {setToggle(false)}}>Scan with camera</button>:
          <button class="camera-toggle" onClick={() => {setToggle(true)}}>Can't scan item?</button>}
      </div>
  );
}
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { addToCart })(Camera);
