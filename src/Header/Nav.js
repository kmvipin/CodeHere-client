import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LoginSignup from '../loginSignup/LoginSignup';
import { useState } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { doLogout, isLogin } from '../auth';
import { logOut } from '../services/person-service';
import AlertMessage from '../components/AlertMessage';

function CollapsibleExample(props) {
  const navigate = useNavigate();
  const {loginForm, loginSignupSync} = props;
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
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href='/' onClick={()=>{navigate('/')}}>CodeHere</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{marginLeft:""}}>
            <Nav.Link href="/#features">Features</Nav.Link>
            <Nav.Link href="/#contact">Contact</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            {!isNavLogin ? (<Nav.Link style={{marginRight:'10px'}} onClick={()=>{setLoginSignup(true)}}>
              Login/SignUp
            </Nav.Link>) :
            (<Nav.Link style={{marginRight:'10px'}} onClick={()=>{handleLogout()}}>
              LogOut
            </Nav.Link>)
            }
          </Nav>
          {isNavLogin && <Nav>
              <div className="profile-icon" onClick={()=>{navigate('/profile')}}>
                <FaUser />
              </div>
          </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default CollapsibleExample;