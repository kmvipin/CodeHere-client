import React, { useEffect, useState } from 'react'
import AceEditor from "react-ace";
import Button from "react-bootstrap/Button";
import './CodeEditor.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const CodeEditor = (props) => {
    const {name,language, initialData, onUpdateData, onRun, onSubmit, isUserLogin,setLanguage} = props;
    const [data, setData] = useState(initialData);

    useEffect(()=>{
        onUpdateData(data);
    },[data])

    useEffect(()=>{
      setData(initialData);
    },[initialData])

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '4px ridge #ddd',
      }}
    >
        <div>
          <select className='language-btn' id="programming-language" style={{cursor:'pointer'}}
          onChange={(e)=>{setLanguage(e.target.value)}}>
              <option value="java">Java</option>
              <option value="cpp" disabled>C/C++</option>
          </select>
        </div>
        <AceEditor
            mode= {language} // Set the language mode (Java in this case)
            name = {name}
            value={data}
            width='100%'
            height='100%'
            className="form-control"
            fontSize={15}px
            onChange={(value) => {
                setData(value);
            }}
        />
        <div className="editor-buttons">
          <OverlayTrigger overlay={!isUserLogin ? <Tooltip id="tooltip-disabled">Login Before Run</Tooltip> : <></>}>
            <span className="d-inline-block">
                <Button variant="danger" onClick={onRun} disabled={!isUserLogin}>Run</Button>
            </span>
          </OverlayTrigger>
          <OverlayTrigger overlay={!isUserLogin ? <Tooltip id="tooltip-disabled">Login Before Submit</Tooltip> : <></>}>
            <span className="d-inline-block">
              <Button variant="success" onClick={onSubmit} disabled={!isUserLogin}>Submit</Button>
            </span>
          </OverlayTrigger>
        </div>
    </div>
  )
}

export default CodeEditor