import React from 'react';
import '../Style/instructions.scss';
import {Link} from 'react-router-dom';

function Instructions(props) {


    return(
        <div className="Instruction">
            <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/updatedLogo+USE+ME.svg" alt="scan & go" className="scango" />
            <h5 className="scangotxt">SCAN & GO</h5>
            <div className="tutorial">
                {/* <div className='instructions-flex'> */}
                    <div className="scanYourItems">
                        <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/barcode.svg" alt="barcode" className="barcode" />
                        <h5 className="Headertxt">Scan your items</h5>
                        <p>Scan the barcode of items as you shop</p>
                    </div>
                    <div className="payWithPhone">
                        <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/phone+Icon+USE+ME.svg" alt="phone icon" className="phoneIcon" />
                        <h5 className="Headertxt">Pay with your phone</h5>
                        <p>Skip the lines, pay with your phone when you are finished</p>
                    </div>
                    <div className="getYourReceipt">
                        <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/invoice.svg" alt="reciept" className="recieptIcon" />
                        <h5 className="Headertxt">Get your receipt</h5>
                        <p>Scan the QR code at the self-checkout if you do not have a card on file!</p>
                    </div>
                {/* </div> */}
                <Link to='/camera'>
                    <button className="ProceedToCamera">Start Shopping</button>
                </Link>
            </div>
        </div>

    )
}

export default Instructions;