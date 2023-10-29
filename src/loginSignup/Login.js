import React from 'react'
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import logo from '../assets/images/loginLogo.jpg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import viewEye from '../assets/images/view-eye.png';
import hideEye from '../assets/images/hide-eye.png';

const Login = (props) => {
    const {onLogin,error,setForgotPass} = props;
    const [userNameEmail,setUserNameEmail] = useState('');
    const [password,setPassword] = useState('');
    const [seePassword,setSeePassword] = useState(false);
  return (
    <div style={{marginTop:'20px',marginLeft:'10px', display:'flex', flexDirection:'column'}}>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight:'20px',
         marginBottom:'20px'}}>
            <img
                src={logo}
                alt="Image Alt Text"
                style={{height:'80%', width:'80%'}}
            />
        </div>
        {error && <small style={{color:'red',alignSelf:'center'}}>{error}</small>}
        <div style={{paddingTop:'20px', paddingBottom:'40px', overflowX:'hidden', display:'flex',flexDirection:'column'}}>
            <small>Email/UserName</small>
            <FloatingLabel
                controlId="floatingInput"
                label="Email address or UserName"
                className="mb-3"
            >
                <Form.Control type="email" placeholder="name@example.com" 
                onChange={(e)=>{setUserNameEmail(e.target.value)}}/>
            </FloatingLabel>
            <small>password</small>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type={seePassword ? "text" : "password"} placeholder="Password" 
                onChange={(e)=>{setPassword(e.target.value)}}/>
                <img
                    src={seePassword ? hideEye : viewEye}
                    alt="Password Icon"
                    className='eye-icon'
                    onClick={()=>{setSeePassword(!seePassword)}}
                />
            </FloatingLabel>
            <Link style={{alignSelf:'center',marginTop:'10px'}}
                onClick={()=>{setForgotPass(true)}}>
                Forgot Password ?
            </Link>
        </div>
        <Button variant='primary' onClick={()=>{onLogin({
            userNameOrEmail :userNameEmail,
            pass : password,
            role: 'ROLE_NORMAL'
        })}}>
            Login
        </Button>
    </div>
    
  )
}

export default Login