import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { connect } from "react-redux";
import { addToCart } from "../Redux/cartReducer";
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
      <>
        {/* <div className="BarcodeScannerContainer"> */}
      <BarcodeScannerComponent className="BarcodeScanner"
        width={'100%'}
        height={'100%'}
        onUpdate={(err, result) => {
          if (result) {
            setData(result.text);
          }
        }}
      />
      <div className='BarcodeScannerContainer'></div>
      <p>{data}</p>
    {/* </div> */}
      </>
  );
}
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { addToCart })(Camera);
