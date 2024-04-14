import React, { useState } from "react";
import sideImage from "../assets/images/signup-side.jpg";
import LoginRegisterToggle from "./LoginRegisterToggle";
import CustomError from "./CustomError";
import Loading from "../components/Loading";
const SignUp = ({
  setLoginPage,
  isLoginPage,
  signUpError,
  handleSignup,
  nextPageStatus
}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignupClick = () => {
    const signup = {
      email: email,
      userName: username,
      pwd: password,
      confirmPwd: password,
    };

    handleSignup(signup);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] w-full sm:px-5 px-3">
      <div className="flex bg-white rounded-lg overflow-hidden max-w-sm lg:max-w-5xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(${sideImage})`,
          }}
        ></div>
        <div className="w-full sm:p-8 lg:w-1/2">
          <LoginRegisterToggle
            isLoginPage={isLoginPage}
            setLoginPage={setLoginPage}
            paragraph="Already Have An Account?"
            linkName="Login"
          />
          <CustomError message={signUpError} />
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Email
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              required
              value={email}
              autoComplete="email"
              placeholder="Email"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Create UserName
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="text"
              required
              value={username}
              autoComplete="username"
              placeholder="Username"
              onChange={(e)=>{setUsername(e.target.value)}}
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Create Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              required
              placeholder="Password"
              value={password}
              autoComplete="current-password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <div className="mt-8">
            <button
              className={`${(nextPageStatus ? 'bg-blue-300' : 'bg-blue-700')} text-white font-bold py-2 px-4 w-full rounded hover:${(!nextPageStatus ? 'bg-blue-600' : '')}`}
              onClick={onSignupClick}
            >
              {!nextPageStatus ? <text>SignUp</text> : <text className="font-medium text-gray-700">{nextPageStatus}</text>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
