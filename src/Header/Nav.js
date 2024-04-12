import LoginSignup from '../loginSignup/LoginSignup';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import { doLogout, isLogin } from '../auth';
import { logOut } from '../services/person-service';
import AlertMessage from '../components/AlertMessage';
import { Button } from 'react-bootstrap';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle,faLinkedin, faGithub  } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react';
import logo from '../assets/images/codehere-logo.png';

function CollapsibleExample(props) {
  const navigate = useNavigate();
  const {loginForm, loginSignupSync,isProfilePage} = props;
  const [loginSignup,setLoginSignup] = useState(false);
  const [isNavLogin,setIsNavLogin] = useState(isLogin());
  const [alertMessage, setAlertMessage] = useState();

  const handleLogout = () =>{
    if(loginSignupSync){
      loginSignupSync();
    }
    try{
        logOut()
        .then(data=>{
          doLogout();
          setIsNavLogin(false);
        })
        .then(()=>{
          navigate('/');
        })
        .catch(err=>{
          setAlertMessage("Something Went Wrong");
        })
    }
    catch(err){
      setAlertMessage("Something Went Wrong");
    }
  }

  const handleAfterLogin = (flag) =>{
    if(loginSignupSync){
      loginSignupSync();
    }
    setIsNavLogin(flag);
  }
  useState(()=>{
    if(loginForm){
      setLoginSignup(true);
    }
  });

  return (
    <div>
      <AlertMessage message={alertMessage} content={"Try Again!!"} setMessage={setAlertMessage}/>
      <LoginSignup showForm={loginSignup} setShowForm={setLoginSignup} 
      callBackAfterSuccess={handleAfterLogin}/>
      <header className="flex-initial w-full py-4 border-t bg-gray-100 h-[55px]">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={()=>{navigate('/')}}>
              <img src={logo} className="bg-transparent h-[35px] w-auto"/>
          </div>
          <nav className="hidden space-x-4 text-[15px] font-semibold lg:flex w-9/12">
            <a
              className="text-gray-900/90 hover:text-gray-900/100 dark:text-gray-50/90 dark:hover:text-gray-50 no-underline"
              href="/#features"
            >
              Features
            </a>
            <a
              className="text-gray-900/90 hover:text-gray-900/100 dark:text-gray-50/90 dark:hover:text-gray-50 no-underline"
              href="/#contact"
            >
              Discuss
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="mailto:vk783838@gmail.com" className="text-black">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="https://www.linkedin.com/in/vipin-886bab25a/" className="text-black" target='_blank'>
              <FontAwesomeIcon icon={faLinkedin}/>
            </a>
            <a href="https://github.com/kmvipin" className="text-black" target="_blank">
              <FontAwesomeIcon icon={faGithub}/>
            </a>
            {isNavLogin && !isProfilePage ? (<Button size="sm" variant="outline-dark" onClick={()=>{navigate('/profile/my-profile')}}>
              Profile
            </Button>) :
            !isProfilePage && <Button size="sm" variant="outline-dark" onClick={()=>{setLoginSignup(true)}}>
              Log In
          </Button>}
          {isProfilePage && <Button size="sm" variant="outline-dark" onClick={()=>{handleLogout()}}>
              Log Out
          </Button>}
          </div>
        </div>
      </header>
    </div>
  );
}

export default CollapsibleExample;