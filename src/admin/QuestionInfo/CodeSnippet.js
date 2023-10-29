import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import AceEditor from "react-ace";
import React, { useEffect, useState } from "react";
import './CodeSnippet.css';


const CodeSnippet = (props) => {
  const {index, data, onChangeData, onDelSnippet} = props;
    const availableLanguage = ["JAVA", "C/C++"];
    const [codeSnippetData, setCodeSnippetData] = useState(data);

    const handleDelSnippet=()=>{
      onDelSnippet(index);
    }

    useEffect(() => {
        onChangeData(index,codeSnippetData);
    }, [codeSnippetData]);

  return (
    <div className="question-container codesnippet-container">
        <Form.Group controlId="exampleForm.ControlSelect1" className="mb-3">
          <div style={{display:"flex"}}>
            <InputGroup.Text style={{width:"200px",justifyContent:"center"}} id="basic-addon3">Language</InputGroup.Text>
            <Form.Control
              as="select"
              value={codeSnippetData.language}
              onChange={(e) => {setCodeSnippetData({...codeSnippetData,language : e.target.value})}}
            >
              <option value="" disabled>Select Language</option>
              
              {availableLanguage.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </div>
          </Form.Group>
          <InputGroup className="mb-3">
            <InputGroup.Text style={{width:"200px",justifyContent:"center"}}>Main Class Impl</InputGroup.Text>
            <AceEditor
              mode="java" // Set the language mode (Java in this case)
              name="mainClassImpl"
              value={codeSnippetData.mainClassImpl}
              style={{height:"400px"}}
              className="form-control"
              fontSize={15}px
              onChange={(value) => {
                // Handle code changes here and update your state
                setCodeSnippetData({...codeSnippetData,mainClassImpl:value});
              }}
          />  
        </InputGroup>
        <InputGroup className="mb-3">
            <InputGroup.Text style={{width:"200px",justifyContent:"center"}}>Solution Prototype</InputGroup.Text>
            <AceEditor
              mode="java" // Set the language mode (Java in this case)
              name="solutionPrototype"
              value={codeSnippetData.solutionPrototype}
              style={{height:"200px"}}
              className="form-control"
              fontSize={15}px
              onChange={(value) => {
                // Handle code changes here and update your state
                setCodeSnippetData({...codeSnippetData, solutionPrototype : value});
              }}
          />
        </InputGroup>
    </div>
  )
}

export default CodeSnippet