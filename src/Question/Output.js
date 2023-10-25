import React from 'react'
import './Output.css';
const Output = (props) => {

    const {data} = props;
  return (
    <div className='output-container'>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div className='wrong-output'>Wrong Output</div>
            <div className='testcase-number'>
                <small>testcase no. : {data.testCaseNumber}</small>
            </div>
        </div>
        <div className='cell-container'>
            <small>Input</small>
            <div className='info-container'>
                {data.testCase.input.map((value,index)=>(
                    <div key={index}>{index===1 && ' , '}{value}</div>
                ))}
            </div>
            {data.stdout && <small>Stdout</small>}
            {data.stdout && <div className='info-container'>
                {data.stdout.map((value,index)=>(
                    <div key={index}>{index===1 && ' , '}{value}</div>
                ))}
            </div>}
            <small>Your Output</small>
            <div className='info-container'>
                {data.yourOutput.map((value,index)=>(
                    <div key={index}>{index===1 && ' , '}{value}</div>
                ))}
            </div>
            <small>Expected Output</small>
            <div className='info-container'>
                {data.testCase.output.map((value,index)=>(
                    <div key={index}>{index===1 && ' , '}{value}</div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Output