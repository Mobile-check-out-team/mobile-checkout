import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { connect } from "react-redux";
import { addToCart } from "../Redux/cartReducer";
import {Link} from 'react-router-dom';
import '../Style/Camera.scss'
// import axios from 'axios';

function Camera(props) {
  const [data, setData] = useState("");

  useEffect(async () => {
    if (data.length > 11) {
      await props.addToCart(data);
      setData("");
      props.history.push("/cart");
    }
  }, [data]);

    return(
      <div className="cameraContainer">
        <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/updatedLogo+USE+ME.svg" alt="scan & go" className="scango" />
        <h5 className="scangotxt">SCAN AND GO</h5>
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
      <p>{data}</p>
      <Link to="/cart">
        <button class="backToCart">Back to Cart</button>
      </Link>
      </>
      </div>
  );
}
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { addToCart })(Camera);
