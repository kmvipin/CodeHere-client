import React, { useState } from "react";
import "./ForgotPassword.css"; // Import the CSS module
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import { sendUserOTP, verifyOTP, changePass} from "../services/person-service";
import AlertMessage from "../components/AlertMessage";

const ForgotPassword = (props) => {
    const {setForgotPass}=props;
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState();
  const [alertDescription, setAlertDescription] = useState("Please Try Again!!");

  const handleEmailChanged = (event) => {
    setUserEmail(event.target.value);
  };

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const handleNewPassChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPassChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const sendOtp = async (event) => {
    event.preventDefault();
    
    try {
      sendUserOTP(userEmail)
      .then((data)=>{
        if(data.success){
            toast.success("OTP sent Successfully");
        }
        else{
            toast.error("Could not be able to send OTP");
        }
      })
      .catch((err)=>{
        setAlertMessage("Something Went Wrong");
      })
    } catch (error) {
      setAlertMessage("Something Went Wrong, Please Try Again!!");
    }
  };

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    try {
      verifyOTP(otp,userEmail)
      .then((data)=>{
            if (data.success === false) {
                toast.error(<h3>Invalid OTP</h3>);
                throw new Error("Wrong OTP");
            }
            toast.success("Successfully Verified");
            setIsOTPVerified(true);
      })
      .catch((err)=>{
        setAlertMessage("Something Went Wrong");
      })
    } catch (error) {
      setAlertMessage("Something Went Wong");
    }
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    try {
      changePass(userEmail,otp,newPassword,confirmPassword)
      .then((data)=>{
        if (!data.success) {
            toast.error("Something Went Wrong");
            return;
        }
        else{
            //write logic more
            toast.success("Password Change Successfully");
            setForgotPass(false);
        }
      })
      .catch((err)=>{
        setAlertMessage("Something Went Wrong");
      });
    } catch (error) {
      setAlertMessage("Something Went Wrong");
    }
  };

  return (
    <div className="fp-container">
        <AlertMessage message={alertMessage} content={alertDescription} 
        setMessage={setAlertMessage}/>
      <form>
        <div className="fp-form-group">
          <label htmlFor="phone">Enter Email:</label>
          <input
            type="email"
            id="phone"
            className="fp-form-control"
            placeholder="Enter E-Mail"
            value={userEmail}
            onChange={handleEmailChanged}
            disabled={isOTPVerified}
          />
        </div>
        {!isOTPVerified && (
          <button className="fp-btn-primary" onClick={sendOtp}>
            Get OTP
          </button>
        )}
        <div className="fp-form-group">
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            className="fp-form-control"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOTPChange}
            disabled={isOTPVerified}
          />
        </div>
        {!isOTPVerified && (
          <button
            className="fp-btn-primary"
            onClick={handleVerifyOTP}
            disabled={isOTPVerified}
          >
            Verify
          </button>
        )}
        <div className="fp-form-group">
          <label htmlFor="password">Enter New-PassWord:</label>
          <input
            type="text"
            id="password"
            className="fp-form-control"
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPassChange}
            disabled={!isOTPVerified}
          />
        </div>
        <div className="fp-form-group">
          <label htmlFor="confirm-password">Enter Confirm-PassWord:</label>
          <input
            type="text"
            id="confirm-password"
            className="fp-form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassChange}
            disabled={!isOTPVerified}
          />
        </div>
        {isOTPVerified && (
          <button className="fp-btn-primary" onClick={handleChangePass} style={{marginBottom:'10px'}}>
            Submit
          </button>
        )}
      </form>
      <Link onClick={()=>{setForgotPass(false)}}>Back</Link>
    </div>
  );
};

export default ForgotPassword;