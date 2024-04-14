import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { isLogin } from '../auth'
import { useEffect } from 'react';

const PrivatePages = () => {
    const navigate = useNavigate();
    const flag = isLogin();

    useEffect(()=>{
        if(!flag){
            navigate("/login");
        }
    },[]);
  return (
    <div>
        {flag && <Outlet/>}
    </div>
  );
}

export default PrivatePages