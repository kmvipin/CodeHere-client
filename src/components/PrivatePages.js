import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { isLogin } from '../auth'
import LoginSignup from '../loginSignup/LoginSignup';
import { useState } from 'react';
import { useEffect } from 'react';

const PrivatePages = () => {
    const navigate = useNavigate();
    const flag = isLogin();
    const [loginForm, setLoginForm] = useState(!flag);

    useEffect(()=>{
        if(!flag && !loginForm){
            navigate(-1);
        }
    },[loginForm]);
  return (
    <div>
        <LoginSignup showForm={loginForm} setShowForm={setLoginForm}/>
        {flag && <Outlet/>}
    </div>
  );
}

export default PrivatePages