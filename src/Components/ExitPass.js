import React, {useState} from 'react';
import { useBarcode } from '@createnextapp/react-barcode';

function ExitPass(props) {
  const { inputRef } = useBarcode({
    value: '1234567890',
    options: {
      background: '#ccffff',
    }
  });
  
  const [state, sState] = useState({
    firstName: '',
    lastName: "" ,
    itemTotal: '',
    quantity_purchased: '',
    date: new Date()

  })




  return <svg ref={inputRef} />;
};

export default ExitPass;

