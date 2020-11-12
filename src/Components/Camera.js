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

  // if(data.length > 10){
  //     props.updateCart(data)
  //     // axios
  //     //     .get(`/api/getItem/${data}`)
  //     //     .then(res => {
  //     //         console.log(res)
  //     //         props.updateCart(res.data)
  //     //         // props.history.push('/cart')
  //     //     })
  //     //     .catch(err => {
  //     //         console.log(err)
  //     //     })
  // }

  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) {
            setData(result.text);
          }
        }}
      />
      <p>{data}</p>
    </>
  );
}
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { addToCart })(Camera);
