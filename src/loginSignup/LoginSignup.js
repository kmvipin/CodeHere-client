import Modal from 'react-bootstrap/Modal';
import React from 'react'
import Login from './Login';
import Signup from './Signup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './LoginSignup.css';
import { useState } from 'react';
import { userLogin, userSignup } from '../services/public-service';
import AlertMessage from '../components/AlertMessage';
import { doLogin, saveUser } from '../auth';
import ForgotPassword from './ForgotPasswod';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const LoginSignup = (props) => {
    const {showForm, setShowForm, callBackAfterSuccess} = props;
    const [loginError, setLoginError] = useState();
    const [signUpError, setSignupError] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [isForgotPass, setIsForgotPass] = useState(false);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const userNamePattern = /^[a-zA-Z]{2}[a-zA-Z0-9]{2,8}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{}|;:'",.<>/?\\]{5,}$/;

    const handleLogin=(data)=>{
        setLoginError(null);
        try{
            userLogin(data)
            .then(res => {
                const {token,...userData} = res;
                if(res.success){
                    doLogin({token:token});
                    callBackAfterSuccess(true);
                    saveUser(userData);
                }
                else{
                    setLoginError(res.message);
                }
                setShowForm(false);
            })
            .catch((error)=>{
                console.error(error);
                if(error.response && error.response.status === 401){
                    setLoginError("Username or Password Incorrect!!");
                }
                else if(error.code === 'ERR_NETWORK'){
                    setAlertMessage("Please Check Your Internet Connection");
                }else{
                    setAlertMessage("Something Went Wrong");
                }
            })
        }
        catch(error){
            setAlertMessage('Something Went Wrong');
        }
    }

    const handleSignup=(data)=>{
        setSignupError(null);
        if(!emailPattern.test(data.email)){
            setSignupError("Write Valid Email");
            return;
        }
        if(!userNamePattern.test(data.userName)){
            setSignupError("Username first 3 letter must alphabets, only alphabets and number allowed");
            return;
        }
        if(!passwordPattern.test(data.pwd)){
            setSignupError("Password Must Contains Alphabets and Number, Min length is 5")
            return;
        }
        if(data.pwd !== data.confirmPwd){
            setSignupError("Both Password Must Be Same");
            return;
        }
        userSignup(data)
        .then((res)=>{
            if(res.success){
                 toast.success("Signup Successfully");
                setShowForm(false);
            }
            else{
                setSignupError(res.message);
            }
        })
        .catch(err=>{
            setAlertMessage("Something Went Wrong");
        })
    }
    useEffect(()=>{
        if(showForm === false){
            setIsForgotPass(false);
            setLoginError(null);
            setSignupError(null);
        }
    },[showForm])
    return (
        <div className='unique-modal'>
        
        <AlertMessage message={alertMessage} content='Check Your Internet Connection OR Try Again' setMessage={setAlertMessage}/>
        <Modal centered show={showForm} onHide={()=>{setShowForm(false); setLoginError(null); setSignupError(null);}} style={{'--bs-modal-width' : '350px'}}>
            <Modal.Header closeButton style={{border:'none', height:'0px', alignSelf:'end', margin:'0',position:'absolute',zIndex:'1'}}></Modal.Header>
            <div className='scrollable-container'>
            {!isForgotPass ? <Tabs
                defaultActiveKey="login"
                id="uncontrolled-tab-example"
                style={{"--bs-nav-link-color" : "#0000009c","--bs-nav-link-hover-color" : 'black'}}
            >
                <Tab eventKey="login" title="Login">
                    <Login onLogin={handleLogin} error={loginError} setForgotPass={setIsForgotPass}/>
                </Tab>
                <Tab eventKey="Signup" title="SignUp">
                    <Signup onSignup={handleSignup} error={signUpError}/>
                </Tab>
            </Tabs> :
            <ForgotPassword setForgotPass={setIsForgotPass}/>}
            </div>
        </Modal>
        </div>
    );
}

export default LoginSignup