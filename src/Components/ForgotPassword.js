import React,{useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import '../Style/ForgotPassword.scss'
import Form from 'react-bootstrap/Form'


function ForgotPassword(props) {
    const [email, setEmail] = useState('')
    const [showReject, setShowReject] = useState(false);

    const sendEmail = async(e) => {
        e.preventDefault();
        await axios
            .post('/api/email', {email})
            .then(() => {
                // alert('email sent!')
                setEmail('')
                props.history.push('/')
            })
            .catch(err => {
                setShowReject(true)
                console.log(err)
            })     
    }

    return(
        <div className='fpw-component'>
            {showReject?
                <Alert className="email-alert" variant="danger" onClose={() => setShowReject(false)} dismissible>
                    <Alert.Heading>Oh snap!</Alert.Heading>
                      <p>Email is not on file</p>
                </Alert>:<></>
            }
            <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/updatedLogo+USE+ME.svg" alt="scan & go" className="scango" />
            <h5 className="scangotxt">SCAN & GO</h5>
            <div className ='fpw-box'>
                <h1 className="ForgotPasswordTxt">Forgot your password?</h1> 
                <span className="fpw-texts">Enter your account's email and we'll 
                    send<br></br> you an email to reset the password</span>
                <Form>
                    <h5 className="fpw-email">EMAIL: </h5>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control className="fpw-email-input" type="email" onChange={(e) =>  setEmail(e.target.value)}/>
                    </Form.Group>
                </Form>
                <button className="email-button" onClick={sendEmail}>
                        SEND EMAIL</button>{' '}
                
                    <span className='fpw-texts'>Remember your password?</span>
                    <Link to='/' className='fpw-link'>Sign in</Link>
                
            </div>
        </div>
    )
}

export default ForgotPassword;