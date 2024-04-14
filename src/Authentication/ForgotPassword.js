import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { sendUserOTP, verifyOTP, changePass } from "../services/person-service";
import AlertMessage from "../components/AlertMessage";
import forgotPassImg from '../assets/images/forgot-pass-slide.png'
import Loading from "../components/Loading";
import CustomError from "./CustomError";

const ForgotPassword = (props) => {
  const { setForgotPass } = props;
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState();
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [OtpButtonContent, SetOtpButtonContent] = useState("Send OTP");
  const [customError, setCustomError] = useState(null);
  const [alertDescription, setAlertDescription] =
    useState("Please Try Again!!");
  const [loadingContent, setLoadingContent] = useState(null);

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
    setLoadingContent(" ");
    SetOtpButtonContent("Sending...");
    try {
      sendUserOTP(userEmail)
        .then((data) => {
          if (data.success) {
            toast.success("OTP sent Successfully");
            SetOtpButtonContent("Re-send OTP");
            setIsOTPSent(true);
          } else {
            toast.error("Could not be able to send OTP");
            SetOtpButtonContent("Send OTP");
          }
          setLoadingContent(null);
        })
        .catch((err) => {
          setAlertMessage("Something Went Wrong");
          SetOtpButtonContent("Send OTP");
          setLoadingContent(null);
        });
    } catch (error) {
      setAlertMessage("Something Went Wrong, Please Try Again!!");
      SetOtpButtonContent("Send OTP");
      setLoadingContent(null);
    }
  };

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    setLoadingContent(" ");
    try {
      verifyOTP(otp, userEmail)
        .then((data) => {
          if (data.success) {
            toast.success("Successfully Verified");
            setIsOTPVerified(true);
          }else{
            toast.error("Invalid OTP");
          }
          setLoadingContent(null);
        })
        .catch((err) => {
          setAlertMessage("Something Went Wrong");
          setLoadingContent(null);
        });
    } catch (error) {
      setAlertMessage("Something Went Wong");
      setLoadingContent(null);
    }
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    if(!validatePass()){
      return;
    }
    setLoadingContent("Updating...");
    try {
      changePass(userEmail, otp, newPassword, confirmPassword)
        .then((data) => {
          if (!data.success) {
            toast.error("Something Went Wrong");
          } else {
            toast.success("Password Change Successfully");
            setForgotPass(false);
          }
          setLoadingContent(null);
        })
        .catch((err) => {
          setAlertMessage("Something Went Wrong");
          setLoadingContent(null);
        });
    } catch (error) {
      setAlertMessage("Something Went Wrong");
      setLoadingContent(null);
    }
  };

  const validatePass = () =>{
    try{
      if(newPassword.length < 5){
        throw Error("Password must be greater than 4");
      }
      else if(newPassword !== confirmPassword){
        throw Error("Confirm-pass must equals new-pass");
      }
    }
    catch(err){
      setCustomError(err.message);
      return false;
    }
    console.log("True");
    return true;
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-58px)] w-full sm:px-5 px-3">
      <AlertMessage
        message={alertMessage}
        content={alertDescription}
        setMessage={setAlertMessage}
      />
      {loadingContent && <Loading content={loadingContent}/>}
      <div className="flex bg-white overflow-hidden max-w-lg lg:max-w-5xl w-full h-full  lg:justify-between justify-center" style={{ filter: loadingContent ? "blur(0.5px)" : "none" }}>
        <div
          className="hidden md:block lg:w-1/2 bg-no-repeat mt-10"
          style={{
            backgroundImage: `url(${forgotPassImg})`,
          }}
        ></div>
        <div className="self-center pr-4 lg:w-[40%] w-full flex flex-col">
        {customError && <CustomError message={customError}/>}
          <form>
            <div id="otp-verification" className={`${(isOTPVerified ? "hidden" : "block")}`}>
              <div id="email" className="flex flex-col">
              <div className="fp-form-group">
                <label htmlFor="phone">Enter Email:</label>
                <input
                  type="email"
                  id="phone"
                  className="fp-form-control"
                  placeholder="Enter E-Mail"
                  value={userEmail}
                  onChange={handleEmailChanged}
                  disabled={false}
                />
              </div>
              {!isOTPVerified && (
                <button className="fp-btn-primary my-2 h-8" onClick={sendOtp}>
                  {OtpButtonContent}
                </button>
              )}
            </div>
            <div id="otp">
              <div className="fp-form-group">
                <label htmlFor="otp">Enter OTP:</label>
                <input
                  type="text"
                  id="otp"
                  className="fp-form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOTPChange}
                  disabled={!isOTPSent}
                />
              </div>
              {!isOTPVerified && isOTPSent && (
                <button
                  className="fp-btn-primary my-2 h-8 w-full"
                  onClick={handleVerifyOTP}
                  disabled={isOTPVerified}
                >
                  Verify
                </button>
              )}
            </div>
            </div>
            
            <div id="pass" className={`${(!isOTPVerified ? 'hidden' : "block")} flex flex-col`}>
              <div className="fp-form-group mb-4">
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
                <label htmlFor="confirm-password">
                  Enter Confirm-PassWord:
                </label>
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
                <button
                  className="fp-btn-primary mt-3 h-8"
                  onClick={handleChangePass}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
          {!isOTPVerified && <Link
            onClick={() => {
              setForgotPass(false);
            }}
            className="self-center py-2"
          >
            Back
          </Link>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
