import React, { useState, useEffect } from "react";
import OTPInput from "react-otp-input";

const EmailVerification = ({signUp, resendOTP}) => {
  const [OTP, setOTP] = useState("");
  const [resendTimer, setResendTimer] = useState(60); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleResendOTP = () =>{
    startTimer();
    resendOTP();
  }

  // Function to start the timer
  const startTimer = () => {
    setIsTimerRunning(true);
    setResendTimer(60); // Reset timer to 60 seconds
  };

  // Function to handle timer tick
  const handleTick = () => {
    setResendTimer((prevTimer) => {
      if (prevTimer === 0) {
        setIsTimerRunning(false); // Stop the timer when it reaches 0
        return 0;
      }
      return prevTimer - 1;
    });
  };

  const handlePaste = (event) => {
    const data = event.clipboardData.getData('text');
    setOTP(data);
  };

  const onChangeOTP= (otp) =>{
    setOTP(otp);
    if(otp.length === 4){
      signUp(otp);
    }
  }

  useEffect(() => {
    let timerInterval;

    if (isTimerRunning) {
      timerInterval = setInterval(() => {
        handleTick();
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    // Clear interval when component unmounts
    return () => clearInterval(timerInterval);
  }, [isTimerRunning]);

  useEffect(()=>{
    startTimer();
  },[]);

  return (
    <div class="h-screen py-20 px-3">
      <div class="container mx-auto">
        <div class="max-w-sm mx-auto md:max-w-lg">
          <div class="w-full">
            <div class="bg-white h-64 py-3 rounded text-center">
              <h1 class="text-2xl font-bold">OTP Verification</h1>
              <div class="flex flex-col mt-4">
                <span>Enter the OTP you received at</span>
                <span class="font-bold">vk783838@gmail.com</span>
              </div>

              <div
                id="otp"
                class="flex flex-row justify-center text-center px-2 mt-5"
              >
                <OTPInput
                  value={OTP}
                  onChange={onChangeOTP}
                  numInputs={4}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      style={{ width: "40px",height:'auto' }}
                      className="text-center border-b-2 mx-2 border-gray-500"
                    />
                  )}
                  
                  onPaste={handlePaste}
                  shouldAutoFocus
                />
              </div>

              <div class="flex justify-center text-center mt-5">
                <a class="flex items-center text-blue-700 hover:text-blue-900">
                  {resendTimer === 0 ?(<button class="font-bold cursor-pointer" onClick={handleResendOTP}>Resend OTP</button>):
                  (<div className="font-bold ml-2 text-gray-500">Resend OTP in {resendTimer} sec</div>)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
