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
            <p>Commodo sint id id enim occaecat aliqua nisi.</p>
            <p>Sit dolore cupidatat nulla culpa enim sit nostrud.</p>
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
