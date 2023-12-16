import React from "react";
import "./Header.css";
import logo from "../assets/images/codehere-high-resolution-logo-transparent.png"

const Header = (props) => {
    const {handleNavigateQuestionList} = props;
  return (
    <div className="header">
      <div className="header-box">
        <div className="left">
          <div>
            <h1>Build</h1>
            <h1>
              Your <span style={{color:'#9942b6ed'}}>Technical</span>
            </h1>
            <h1>Skills</h1>
          </div>
          <div className="para">
            <p>Empowering beginners and refining logic skills.</p>
            <p>Elevate your coding journey with structured learning paths and hands-on challenges.</p>
          </div>
          <div>
            <button onClick={()=>{handleNavigateQuestionList(true,true,true)}}>Explore</button>
          </div>
        </div>
        <div className="right">
          <img src={logo} alt="codehere"/>
        </div>
      </div>
    </div>
  );
};

export default Header;
