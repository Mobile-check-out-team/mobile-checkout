import React,{useState} from 'react';
import axios from 'axios';
import '../Style/Auth.scss'
import {connect} from 'react-redux'
import {getUser} from '../Redux/authReducer'
import {Link} from 'react-router-dom';
import {Alert} from 'react-bootstrap';



function Auth(props) {
    const [state, sState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        verPassword: '',
        registerView: false
    })
    const [showReject, setShowReject] = useState(false);
    const [doNotMatch, setDoNotMatch] = useState(false);
    const [emailRegistered, setEmailRegistered] = useState(false);
    const [formNotFilled, setFormNotFilled] = useState(false);
    const handleInput = (event) => {
        sState({...state, [event.target.name]: event.target.value})
    }  
    const handleToggle = () => {
        sState({...state, registerView: !state.registerView})
    }

    const handleLogin = () => {
        const {email, password} = state
        axios
        .post('/api/login', {email, password})
        .then(res => {
            props.getUser(res.data)
            props.history.push('/instructions')
        })
        .catch(err => {
            setShowReject(true)
        })
    }
    const handleRegister = () => {
        const {firstName, lastName, email, password, verPassword} = state;
        if(!firstName || !lastName || !email || !password || !verPassword){
            setFormNotFilled(true)
        }
        else if(password && password === verPassword){
            axios.post('/api/register', {firstName, lastName, email,  password})
            .then(res => {
                props.getUser(res.data);
                props.history.push('instructions');
            })
            .catch(err => {
                setEmailRegistered(true)
            });
        }
        else if(password && password !== verPassword){
            setDoNotMatch(true)
        }
    }

    return (    
        <div className="Auth">
            {formNotFilled?
                <Alert className="incorrect-alert" variant="danger" onClose={() => setFormNotFilled(false)} dismissible>
                    <Alert.Heading>Oh snap!</Alert.Heading>
                      <p>Please enter missing information.</p>
                </Alert>:<></>}
            {emailRegistered?
                <Alert className="incorrect-alert" variant="danger" onClose={() => setEmailRegistered(false)} dismissible>
                    <Alert.Heading>Oh snap!</Alert.Heading>
                      <p>Email is already registered!</p>
                </Alert>:<></>}
            {doNotMatch?
                <Alert className="incorrect-alert" variant="danger" onClose={() => setDoNotMatch(false)} dismissible>
                    <Alert.Heading>Oh snap!</Alert.Heading>
                      <p>Passwords do not match! Try again.</p>
                </Alert>:<></>}
            {showReject?
                <Alert className="incorrect-alert" variant="danger" onClose={() => setShowReject(false)} dismissible>
                    <Alert.Heading>Oh snap!</Alert.Heading>
                      <p>Incorrect email or password. Try again.</p>
                </Alert>:<></>}
            <header className='auth-header'>
                <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/updatedLogo+USE+ME.svg" alt="scan & go" className="scango" />
                <h5 className="scangotxt">SCAN & GO</h5>
            </header>
            
            <section className='auth-box'>
                {state.registerView
                ? <h1>Create Your Account</h1> 
                : <h1>Login</h1>}
                <div className="auth-input-fields">
                    {state.registerView
                    ?
                    <>
                        <h5>FIRST NAME:</h5>
                        <input
                            value={state.firstName}
                            name='firstName'
                            // placeholder='First Name'
                            onChange={(e) =>  handleInput(e)}
                        />
                        <h5>LAST NAME:</h5>
                        <input
                            value={state.lastName}
                            name='lastName'
                            // placeholder='Last Name'
                            onChange={(e) =>  handleInput(e)}
                    />
                    </>     
                    :null
                    }
                    <h5>EMAIL:</h5>
                    <input
                        value={state.email}
                        name='email'
                        onChange={(e) =>  handleInput(e)}/>
                    <h5>PASSWORD:</h5>
                    <input 
                        type='password'
                        value={state.password}
                        name='password'
                        onChange={(e) => handleInput(e)}/>

                    {state.registerView?
                        (<>
                            <h5>VERIFY PASSWORD:</h5>
                            <input 
                                type='password'
                                value={state.verPassword}
                                name='verPassword'
                                onChange={(e) => handleInput(e)}/>
                            <button 
                                className='auth-button'
                                onClick={handleRegister}
                                >CREATE ACCOUNT</button>
                        </>):
                        (<>
                            <button 
                                className='auth-button'
                                onClick={handleLogin}
                                >LOG IN</button>
                            
                        </>)
                    }
                </div>
                {state.registerView
                ?<div>
                    <p className="ChangeViewsContext">Already have an account? </p>
                    <span className="ChangeViews"
                    name='registerView'
                    onClick={handleToggle}>Log in</span>
                </div>
                :<div>
                    <p className="ChangeViewsContext">Don't have an account?</p>
                    <span className="ChangeViews" 
                    name='registerView'
                    onClick={handleToggle}>Create account</span>
                </div>
                }
                {state.registerView?null:
                <Link  className='forgotPassword' to='/forgotpassword'>Forgot your password?</Link>
                }
            </section>
        </div>
    )
}


export default connect(null, {getUser})(Auth);

