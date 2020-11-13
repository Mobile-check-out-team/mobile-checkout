import React from 'react';
import { useBarcode } from '@createnextapp/react-barcode';

function ExitPass() {
  const { inputRef } = useBarcode({
    value: '1234567890',
    options: {
      background: '#ccffff',
    }
  });
  function date(props){
      const [state, sState] = useState({
        firstName: '',
        lastName: "" ,
        itemTotal: '',
        quantitiy_purchased: '',
        date: new Date(),

      })

  }
  dateObj.setUTCSeconds(secondsValue[ msValue])


  return <svg ref={inputRef} />;
};

export default ExitPass;


//date -create
//total - cartreducer
// clear cart after user session
//moount make a state if req.session.user.cart map off of but if its a blank array map off propss