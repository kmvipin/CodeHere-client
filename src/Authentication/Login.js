import React, { useState } from "react";
import LoginRegisterToggle from "./LoginRegisterToggle";
import CustomError from "./CustomError";

const Login = ({ setLoginPage, isLoginPage, handleLogin, loginError, nextPageStatus, setIsForgotPass}) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = () => {
    const login = {
      userNameOrEmail: usernameOrEmail,
      pass: password,
      role: "ROLE_NORMAL",
    };
    handleLogin(login);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] w-full sm:px-5 px-3">
      <div className="flex bg-white overflow-hidden max-w-sm lg:max-w-5xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage: `url(https://img.freepik.com/premium-vector/sign-page-illustration-design-template_559664-157.jpg?w=740)`,
          }}
        ></div>
        <div className="w-full sm:p-8 lg:w-1/2 mt-4">
          <LoginRegisterToggle
            isLoginPage={isLoginPage}
            setLoginPage={setLoginPage}
          />
          <CustomError message={loginError} />
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username or Email
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              value={usernameOrEmail}
              required
              placeholder="Username or Email"
              autoComplete="email"
              onChange={(e) => {
                setUsernameOrEmail(e.target.value);
              }}
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              value={password}
              autoComplete="current-password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
              onClick={()=>{setIsForgotPass(true)}}
            >
              Forget Password?
            </a>
          </div>
          <div className="mt-8">
          <button
              className={`${(nextPageStatus ? 'bg-blue-300' : 'bg-blue-700')} text-white font-bold py-2 px-4 w-full rounded hover:${(!nextPageStatus ? 'bg-blue-600' : '')}`}
              onClick={onLoginClick}
            >
              {!nextPageStatus ? <text>Login</text> : <text className="font-medium text-gray-700">{nextPageStatus}</text>}
            </button>
          </div>
          <a
            href="#"
            className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
          ></a>
          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="#"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <span
                className="text-blue-700"
                onClick={() => {
                  setLoginPage(false);
                }}
              >
                Sign Up
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;