import React, { useEffect, useState } from "react";
import Output from "./Output";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Result.css";
import "./SuccessfullySubmitMessage.css";
import LoadingAnimation from "./LoadingAnimation";
import Confetti from "react-confetti";

const Result = (props) => {
  const data = props.data;

  const [loading, setLoading] = useState(props.loading);
  const [defaultKey, setDefaultKey] = useState("result"); // Default to 'result'
  const [isSubmit, setIsSubmit] = useState(props.isSubmit);
  const [isRun, setIsRun] = useState(props.isRun);

  useEffect(() => {
    // Check if data is available and if errorStack is null
    if (data && data.errorStack == null && !data.success) {
      setDefaultKey("testcase");
    } else {
      setDefaultKey("result");
    }
  }, [data]);

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  useEffect(() => {
    setIsSubmit(props.isSubmit);
    setIsRun(props.isRun);
  }, [props.isSubmit, props.isRun]);

  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="overflow-auto m-1 w-[98%]"
    >
      <Tabs
        defaultActiveKey={defaultKey}
        id="uncontrolled-tab-example"
        style={{
          "--bs-nav-link-color": "#0000009c",
          "--bs-nav-link-hover-color": "black",
          "--bs-nav-link-padding-x": "4px",
          "--bs-nav-link-padding-y": "4px",
          fontSize: "15px",
        }}
        activeKey={defaultKey}
      >
        <Tab eventKey="result" title="Result">
          {!loading && data && data.errorStack != null ? (
            <div className="p-2 bg-[#ff00002b] rounded-lg h-full">
              {data.errorStack.map((value, index) => (
                <div key={index} className="error-list">
                  <div>Message : {value.message}</div>
                  <div>
                    Line number : {value.lineNumber} : {value.columnNumber}
                  </div>
                  {value.methodName && (
                    <div>Method Name : {value.methodName}</div>
                  )}
                  {value.className && <div>ClassName : {value.className}</div>}
                </div>
              ))}
            </div>
          ) : !loading ? (
            <div className="flex justify-center items-center h-[30vh]">
              {data && data.success ? (
                <div>
                  {isRun ? (
                    <div className="border-2 border-y-blue-500 text-blue-500 px-6 py-4 rounded-md shadow-lg flex items-center justify-between animate-pulse flex-col">
                      <div className="flex items-center">
                        <span className="text-4xl mr-4">🚀</span>
                        <span className="text-lg font-bold">
                          Example Pass Successfully
                        </span>
                      </div>
                      <div className="ml-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Now Go For Submit</span>
                    </div>
                  ) : isSubmit ? (
                    <div>
                      <Confetti width={1000} height={500} />
                      <div className="border-2 border-x-green-500 text-green-500 px-6 py-4 rounded-md shadow-lg flex items-center justify-between animate-pulse">
                        <div className="flex items-center">
                          <span className="text-4xl mr-4">✨</span>
                          <span className="text-lg font-bold">
                          Solution Successfully Submitted
                          </span>
                        </div>
                        <div className="ml-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <text className="text-center">Something Went Wrong</text>
                  )}
                </div>
              ) : (
                <div className="text-green-700 text-2xl font-bold text-center">
                  Click Run or Submit to see Result
                </div>
              )}
            </div>
          ) : (
            <LoadingAnimation />
          )}
        </Tab>
        <Tab eventKey="testcase" title="TestCase">
          {!loading && data && data.errorStack == null && !data.success ? (
            <div>
              <Output data={data} />
            </div>
          ) : !loading ? (
            <div>No Wrong Answer</div>
          ) : (
            <LoadingAnimation />
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Result;
