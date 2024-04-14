import React, { useState } from "react";
import Login from "./Login";
import Nav from "../Header/Nav";
import SignUp from "./SignUp";
import EmailVerification from "./EmailVerification";
import AlertMessage from "../components/AlertMessage";
import {
  getEmailOrUsernameStatus,
  userLogin,
  userSignup,
} from "../services/public-service";
import { doLogin, saveUser } from "../auth";
import { toast } from "react-toastify";
import validator from "validator";
import { matches } from "validator";
import Loading from "../components/Loading";
import { sendUserOTP } from "../services/person-service";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const [loginPage, setLoginPage] = useState(true);
  const [verificationPage, setVerificationPage] = useState(false);
  const [loginError, setLoginError] = useState();
  const [signUpError, setSignupError] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [loadingContent, setLoadingContent] = useState("");
  const [nextPageStatus, setNextPageStatus] = useState(null);
  const [isForgotPass, setIsForgotPass] = useState(false);
  const [person, setPerson] = useState();
  const [signupOTP, setSignupOTP] = useState();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    if (data.userNameOrEmail.length < 2) {
      setLoginError("username or email have at least 2 character");
      return;
    } else if (data.pass.length < 5) {
      setLoginError("Password have at least 5 characters");
      return;
    }

    setLoginError(null);
    setLoadingContent(" ");
    setNextPageStatus("Verifying...");
    try {
      userLogin(data)
        .then((res) => {
          const { token, ...userData } = res;
          if (res.success) {
            doLogin({ token: token });
            saveUser(userData);
            toast.success("Login Successfully");
            navigate("/");
          } else {
            setLoginError(res.message);
          }
          setLoadingContent(null);
          setNextPageStatus(null);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            setLoginError("Username or Password Incorrect!!");
          } else if (error.code === "ERR_NETWORK") {
            setAlertMessage("Please Check Your Internet Connection");
          } else {
            setAlertMessage("Something Went Wrong");
          }
          setLoadingContent(null);
          setNextPageStatus(null);
        });
    } catch (error) {
      setAlertMessage("Something Went Wrong");
      setLoadingContent(null);
      setNextPageStatus(null);
    }
  };

  const handleValidate = (data) => {
    try {
      if (!validator.isEmail(data.email)) {
        throw Error("Enter a Valid Email");
      }
      if (!matches(data.userName, /^.{3,35}$/)) {
        throw Error("Username Contains 3 to 35 Characters");
      }
      if (!matches(data.userName, /^[a-zA-Z]/)) {
        throw Error("Username First Character Must Be Alphabet");
      }
      if (!matches(data.userName, /^[a-z][a-z0-9]*$/)) {
        throw Error("UserName Contains LowerCase Alphabets And Digits");
      }
      if (!matches(data.pwd, /^.{5,25}$/)) {
        throw Error("Password Contains 5 to 25 Characters");
      }
    } catch (err) {
      setSignupError(err.message);
      return false;
    }
    return true;
  };

  const handleSignup = async (data) => {
    setSignupError(null);
    setLoadingContent(" ");
    if (!handleValidate(data)) {
      setLoadingContent(null);
      return;
    }
    setPerson(data);
    try {
      const status = await getEmailOrUsernameStatus(data.email, data.userName);
      if (!status.success) {
        setSignupError(status.message);
        return;
      }
      await sendOTP(data.email);
    } catch (error) {
      setAlertMessage("Something Went Wrong..");
    } finally {
      setLoadingContent(null);
      setNextPageStatus(null);
    }
  };

  const sendOTP = async (email) => {
    try {
      setLoadingContent("Sending OTP...");
      const otpResponse = await sendUserOTP(email);

      if (otpResponse.success) {
        toast.success("OTP Sent Successfully !!");
        setVerificationPage(true);
      } else {
        toast.error("Could not able to send OTP");
      }
    } catch (err) {
      setAlertMessage("Somthing Went Wrong");
    } finally {
      setLoadingContent(null);
    }
  };

  const signUp = async (otp) => {
    setLoadingContent("Verifying OTP...");
    try {
      const signupResponse = await userSignup(person, otp);
      if (signupResponse.success) {
        toast.success("Signup Successfully");
        setVerificationPage(false);
        setLoginPage(true);
        return;
      } else {
        toast.error(signupResponse.message);
      }
    } catch (err) {
      setAlertMessage("Something Went Wrong..");
    } finally {
      setLoadingContent(null);
    }
  };

  return (
    <div className="h-screen">
      <AlertMessage
        message={alertMessage}
        content="Check Your Internet Connection OR Try Again"
        setMessage={setAlertMessage}
      />
      <Nav />
      <div className="relative">
        {loadingContent && <Loading content={loadingContent} />}
        {!loginPage ? (
          verificationPage ? (
            <div style={{ filter: loadingContent ? "blur(0.8px)" : "none" }}>
              <EmailVerification
                signUp={signUp}
                resendOTP={() => {
                  sendOTP(person.email);
                }}
              />
            </div>
          ) : (
            <SignUp
              setLoginPage={setLoginPage}
              isLoginPage={loginPage}
              setVerificationPage={setVerificationPage}
              signUpError={signUpError}
              handleSignup={handleSignup}
              nextPageStatus={nextPageStatus}
            />
          )
        ) : !isForgotPass ? (
          <Login
            setLoginPage={setLoginPage}
            isLoginPage={loginPage}
            handleLogin={handleLogin}
            loginError={loginError}
            nextPageStatus={nextPageStatus}
            setIsForgotPass={setIsForgotPass}
          />
        ) : (
          <ForgotPassword setForgotPass={setIsForgotPass} />
        )}
      </div>
    </div>
  );
};

export default Authentication;
