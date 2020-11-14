import React, { useState } from "react";
import { useBarcode } from "@createnextapp/react-barcode";

function ExitPass(props) {
  const [state, sState] = useState({
    date: new Date(),
  });
  // useEffect(() => {

  //   },[])

  const { inputRef } = useBarcode({
    value: "1234567890",
    options: {
    background: "#ccffff",
    },
  });
  return (
    <header className="exit-pass">
      <div className='exit-head'>
        <p>Exit Pass</p>
        <p className='exit-page'>Done</p>
      </div>
     <div className='barCode'>
         <p>Exit Pass</p>
         <span className='date'>date</span>
         <span className='name'>Ellie McQueen</span>
         <span className='totalAmount'>total</span>
         <span className='itemTotal'>item</span>
      <img ref={inputRef} />
      </div>
    </header>
  );
}
export default ExitPass;

//   // const { inputRef } = useBarcode({
//   //   value: '1234567890',
//   //   options: {
//   //     background: '#ccffff',
//   //   }
//   // })

//      {/* <svg ref={inputRef} /> */}
