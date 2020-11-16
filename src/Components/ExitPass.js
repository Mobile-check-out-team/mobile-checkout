import React, { useState } from "react";
import { useBarcode } from "@createnextapp/react-barcode";
import '../Style/ExitPass.scss'
function ExitPass(props) {
  const [state, sState] = useState({
    date: new Date(),
  });
  // useEffect(() => {

  //   },[])

  const { inputRef } = useBarcode({
    value: "1234567890",
    options: {
    background: "white",
    
    },
  });
  return (
    <header className='exit-body'>
      
      <div className='exit-head'>
        <p>Exit Pass </p>
      </div>
       <p className='exit-page'>Done </p>
    <div className='bar-code-box'>
         <p className='bar-pass'>Exit Pass </p>
      <div className='name-date'>
         <span className='name'>Ellie McQueen </span>
         <span className='date'>Date </span>
      </div>
      <div className='total-item'>
         <span className='totalAmount'>Total </span>
         <span className='itemTotal'>item </span>
      </div>
      <div className='bar-code'>
      <img ref={inputRef} />
      </div>
    </div>
    
    </header>
  );
}
export default ExitPass;
