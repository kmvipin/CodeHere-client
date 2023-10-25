import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import AceEditor from "react-ace";
import React, { useEffect, useState } from "react";

const CodeSnippet = (props) => {
  const {index, data, onChangeData} = props;
    const availableLanguage = ["JAVA", "CPP"];
    const [codeSnippetData, setCodeSnippetData] = useState({...data})

    useEffect(() => {
        onChangeData(index,codeSnippetData);
    }, [codeSnippetData]);
  return (
    <div className="question-container" style={{boxShadow:"0px 0px 5px rgba(0, 0, 0, 0.2)",
     borderRadius:"1px", border:"0.009px dotted", marginBottom:"0px"}}>
        <Form.Group controlId="exampleForm.ControlSelect1" className="mb-3">
          <div style={{display:"flex"}}>
            <InputGroup.Text style={{width:"200px",justifyContent:"center"}} id="basic-addon3">Language</InputGroup.Text>
            <Form.Control
              as="select"
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