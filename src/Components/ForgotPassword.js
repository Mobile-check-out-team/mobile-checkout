import React,{useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import '../Style/ForgotPassword.scss'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


function ForgotPassword(props) {
    const [email, setEmail] = useState('')
    const [show, setShow] = useState(false);

    const sendEmail = async(e) => {
        e.preventDefault();
        console.log(email)
        await axios
            .post('/api/email', {email})
            .then(() => {
                alert(`Reset password email has been sent.`)
                setEmail('')
                props.history.push('/')
            })
            .catch(err => {
                setShow(true)
                console.log(err)
            })     
    }

    if (show) {
        return (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>Email is not on file</p>
          </Alert>
        );
    }
    

    return(
        <div className='fpw-component'>
            <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/updatedLogo+USE+ME.svg" alt="scan & go" className="scango" />
            <h5 className="scangotxt">SCAN AND GO</h5>
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
                <button onClick={sendEmail}>
                        SEND EMAIL</button>{' '}
                <div>
                    <span>Remember your password?</span>
                    <br></br>
                    <Link to='/' className="links">Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;