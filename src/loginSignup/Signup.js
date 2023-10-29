import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import viewEye from '../assets/images/view-eye.png';
import hideEye from '../assets/images/hide-eye.png';

const Signup = (props) => {
  const {onSignup, error} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [seePassword,setSeePassword] = useState(false);

  return (

    <div style={{marginTop:'20px',marginLeft:'10px', display:'flex', flexDirection:'column'}}>
        {error && <small style={{color:'red',alignSelf:'center'}}>{error}</small>}
        <div style={{paddingTop:'20px', paddingBottom:'40px', overflowX:'hidden'}}>
        <small>UserName</small>
            <FloatingLabel controlId="floatingPassword" label="Create UserName">
                <Form.Control type="text" placeholder="username" 
                onChange={(e)=>{setUserName(e.target.value)}}/>
            </FloatingLabel>
            <small>Email</small>
            <FloatingLabel controlId="floatingPassword" label="Enter Email">
                <Form.Control type="email" placeholder="email" 
                onChange={(e)=>{setEmail(e.target.value)}}/>
            </FloatingLabel>
            <small>Password</small>
            <FloatingLabel controlId="floatingPassword" label="Enter Password">
                <Form.Control type={seePassword ? "text" : "password"} placeholder="password" 
                onChange={(e)=>{setPassword(e.target.value)}}/>
                <img
                    src={seePassword ? hideEye : viewEye}
                    alt="Password Icon"
                    className='eye-icon'
                    onClick={()=>{setSeePassword(!seePassword)}}
                />
            </FloatingLabel>
            <small>Confirm Password</small>
            <FloatingLabel controlId="floatingPassword" label="Enter Confirm Password">
                <Form.Control type="password" placeholder="password" 
                onChange={(e)=>{setConfirmPass(e.target.value)}}/>
            </FloatingLabel>
        </div>
        <Button variant='primary' 
        onClick={()=>{onSignup({email:email,
                                userName:userName,
                                pwd:password,
                                confirmPwd:confirmPass})}}>
            SignUp
        </Button>
    </div>
  )
}

export default Signup