import LoginSignup from '../loginSignup/LoginSignup';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { doLogout, isLogin } from '../auth';
import { logOut } from '../services/person-service';
import AlertMessage from '../components/AlertMessage';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars} from '@fortawesome/free-solid-svg-icons';
import { faGoogle,faLinkedin, faGithub  } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from 'react';
import logo from '../assets/images/codehere-logo.png';

function CollapsibleExample(props) {
  const navigate = useNavigate();
  const {loginForm, loginSignupSync,isFixed} = props;
  const [loginSignup,setLoginSignup] = useState(false);
  const [isNavLogin,setIsNavLogin] = useState(isLogin());
  const [alertMessage, setAlertMessage] = useState();
  const [scrolling, setScrolling] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <AlertMessage message={alertMessage} content={"Try Again!!"} setMessage={setAlertMessage}/>
      <LoginSignup showForm={loginSignup} setShowForm={setLoginSignup} 
      callBackAfterSuccess={handleAfterLogin}/>
      <header style={{background:(isFixed?(scrolling?'rgb(143 143 143 / 64%)':'transparent'):'#8f8f8f'), position:(isFixed?'fixed':'relative')}}>
        <input type="checkbox" name="" id="chk1" />
        <div className="logo" onClick={()=>{navigate('/')}}>
          <img src={logo}/>
        </div>
        {/* <div className="search-box">
          <form>
            <input type="text" name="search" id="srch" placeholder="Search" />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div> */}
        <ul>
          <li>
            <a href="/#features">Features</a>
          </li>
          <li>
            <a href="/#contact">Contact</a>
          </li>
          <li>
            {!isNavLogin ? (<a href="#" onClick={()=>{setLoginSignup(true)}}>Login/SignUp</a>):
            (<a href='#' onClick={()=>{handleLogout()}}>LogOut</a>)}
          </li>
          <li>
            <a href="mailto:vk783838@gmail.com">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="https://www.linkedin.com/in/vipin-886bab25a/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/kmvipin">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
          {isNavLogin && <div className="profile-icon" onClick={()=>{navigate('/profile/my-profile')}}>
                <FaUser />
          </div>}
        </ul>
        <div className="menu">
          <label htmlFor="chk1">
            <FontAwesomeIcon icon={faBars} />
          </label>
        </div>
      </header>
    </div>
  );
}

export default CollapsibleExample;