import React, { useEffect, useState } from 'react'
import Output from './Output'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Result.css';
import './SuccessfullySubmitMessage.css';
import LoadingAnimation from './LoadingAnimation';
import Confetti from 'react-confetti'

const Result = (props) => {
  const data = props.data;

  const [loading,setLoading] = useState(props.loading);
  const [defaultKey, setDefaultKey] = useState('result'); // Default to 'result'
  const [isSubmit,setIsSubmit] = useState(props.isSubmit);
  const [isRun, setIsRun] = useState(props.isRun);

  useEffect(() => {
    // Check if data is available and if errorStack is null
    if (data && data.errorStack == null && !data.success) {
      setDefaultKey('testcase');
    }
    else {
      setDefaultKey('result');
    }
  }, [data]);

  useEffect(()=>{
    setLoading(props.loading);
  },[props.loading])

  useEffect(()=>{
    setIsSubmit(props.isSubmit);
    setIsRun(props.isRun);
  },[props.isSubmit,props.isRun])

  return (
    <div style={{scrollbarWidth:'none'}} className="overflow-auto w-full m-1">
      <Tabs
        defaultActiveKey={defaultKey}
        id="uncontrolled-tab-example"
        style={{"--bs-nav-link-color" : "#0000009c","--bs-nav-link-hover-color" : 'black',
        '--bs-nav-link-padding-x' : '4px','--bs-nav-link-padding-y' : '4px', fontSize:'15px'}}
        activeKey={defaultKey}
      >
          <Tab eventKey="result" title="Result" >
            {!loading && data && data.errorStack != null ? (
              <div className="p-2 bg-[#ff00002b] rounded-lg h-full">
                  {data.errorStack.map((value, index)=>(
                      <div key={index} className='error-list'>
                          <div>Message : {value.message}</div>
                          <div>Line number : {value.lineNumber} : {value.columnNumber}</div>
                          {value.methodName && <div>Method Name : {value.methodName}</div>}
                          {value.className && <div>ClassName : {value.className}</div>}
                      </div>
                  ))}
              </div>
            ) : !loading ?
            (<div className="flex justify-center items-center h-[30vh]">
              {data && data.success ? (
              <div>
                {isRun ? (<div className='congratulation-message'>
                  Pass SuccessFully
                </div>) : isSubmit ?
                (<div>
                  <Confetti
                    width={1000}
                    height={500}
                  />
                  Solution Successfully Submitted
                </div>) : <>Something Went Wrong</>}
              </div>) : 
              (<div className='text-green-700 text-2xl font-bold'>
                 Click Run or Submit to see Result
              </div>)}
            </div>)
            :
            (<LoadingAnimation/>)
            }
          </Tab>
          <Tab eventKey="testcase" title="TestCase">
            {!loading && data && data.errorStack == null && !data.success ? (<div>
              <Output data = {data}/>
            </div>) : !loading ?
            (<div>No Wrong Answer</div>)
              :
              (<LoadingAnimation/>)
          }
          </Tab>
      </Tabs>
    </div>
  )
}

export default Result