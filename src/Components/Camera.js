import React from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import {connect} from 'react-redux';
import {updateCart} from '../Redux/cartReducer'

function Camera(props) {
    const [ data, setData ] = React.useState('');

    if(data.length > 10){
        console.log('data', data)
        updateCart(data)

    }

    return(
        <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        //when data set data to reducer
        onUpdate={(err, result) => {
          
            if (result){
              setData(result.text)
            //   updateCart(data)
            }
        
        }}
      />
      <p>{data}</p>
    </>
    )
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {updateCart})(Camera);


