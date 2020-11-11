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
            <div className ='fpw-box'>
                <h1>Logo</h1>
                <h1 >Forgot your password?</h1> 
                <span>Enter your account's email and we'll send you an email to reset the password</span>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email (required)" onChange={(e) =>  setEmail(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="secondary" 
                        onClick={sendEmail}>SEND EMAIL</Button>{' '}
                <div>
                    <span>Remember your password?</span>
                    <Link to='/'>Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;