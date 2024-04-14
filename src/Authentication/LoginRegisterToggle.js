import React from 'react'

const LoginRegisterToggle = ({
    paragraph="dont have register yet",
    linkName="Register",
    setLoginPage,
    isLoginPage,
  }) => {
    return (
      <div>
        <div className="flex justify-center border-2h-full">
          <nav className="flex justify-between w-full item-center h-full">
            <button
              type="button"
              className={`border border-gray-200 w-[45%] rounded-sm`}
              style={{ backgroundColor: !isLoginPage ? "#f7f7f7" : "#e3ebf7" }}
              id="card-type-tab-item-1"
              onClick={() => {
                setLoginPage(true);
              }}
            >
              Login
            </button>
            <button
              type="button"
              id="card-type-tab-item-1"
              style={{ backgroundColor: isLoginPage ? "#f7f7f7" : "#e3ebf7" }}
              className={`border border-gray-200 w-[45%] rounded-sm py-2`}
              onClick={() => {
                setLoginPage(false);
              }}
            >
              Register
            </button>
          </nav>
        </div>
        
        <p className="mt-3 text-center text-sm text-gray-600">
          {paragraph}{" "}
          <span
            className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer"
            onClick={() => {
              setLoginPage((prev) => !prev);
            }}
          >
            {linkName}
          </span>
        </p>
      </div>
    );
}

export default LoginRegisterToggle;