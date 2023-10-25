import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import './AddQuestion.css'; // Import the CSS file you created
import Nav from'../../Header/Nav';
import "react-ace";

import "ace-builds/src-noconflict/mode-java"; // Import the Java mode
import CodeSnippet from "./CodeSnippet";
import Examples from "./Examples";
import ConfirmModal from "./ConfirmModal";
import AdminNav from "../AdminNav";
import { saveQuestionInfo } from "../../services/admin/admin-service";

function AddQuestion() {

  const initialCodeSnippetData = {
    mainClassImpl : "public class Main{\n    public static void main(String args[]){\n       System.out.println(\"Hello,World\");\n   }\n}",
    solutionPrototype : "public class CodeHere{\n   \n}",
    language : "JAVA"
  }

  const initialExampleData = {
    input : [],
    output : [],
    explanation : ''
  }

  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [exampleData, setExampleData] = useState([initialExampleData]);
  const [codeSnippetData, setCodeSnippetData] = useState([{...initialCodeSnippetData}]);
  const [availableTopics, setAvailableTopics] = useState(["ARRAY", "STRING", "RECURSION","LOOPS","INTEGER","If-Else"]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [questionName,setQuestionName] = useState();
  const [questionDescription, setQuestionDescription] = useState();
  const [runcases, setRuncases] = useState([]);
  const [constraints, setConstraints] = useState([]);

  const handleConfirmSubmission=()=>{
    setShowConfirmation(false);
    const question = {
        name : questionName,
        difficulty : selectedDifficulty,
        topicTags : selectedTopics,
        question : questionDescription,
        runCase : runcases,
        codeSnippets : codeSnippetData,
        examples : exampleData,
        constraints : constraints
    }

    try{
      saveQuestionInfo(question)
      .then((data)=>{
        console.log("Successfully Saved : ",data);
      })
      .catch((error)=>{
        console.error(error);
      });
    }
    catch(err){
      console.error(err);
    }

    console.log('question : ',question);
    console.log('Submitted SuccessFully');
  }

  const handleUpdateData = (index, newData) =>{
    const updatedData = [...codeSnippetData];
    updatedData[index] = newData;
    setCodeSnippetData(updatedData);
  }

  const handleUpdateExamplesData = (index,newData) =>{
    const updatedData = [...exampleData];
    updatedData[index] = newData;
    setExampleData(updatedData);
  }

  const handleTopicChange = (e) => {
    const value = e.target.value;
    const updataeAvailableTopic = availableTopics.filter(topic => topic !== value);
    setSelectedTopics([...selectedTopics,value]);
    setAvailableTopics(updataeAvailableTopic);
  };
  const handleRemoveTopics = (option)=>{
    const filteredTopics = selectedTopics.filter(topic => topic !== option);
    setAvailableTopics([...availableTopics,option]);
    setSelectedTopics(filteredTopics);
  }
  const addCodeSnippet = () =>{
    // Create a new unique key for each CodeSnippet
    const data = {
      mainClassImpl : "",
      solutionPrototype : "",
      language : ""
    }

    setCodeSnippetData([...codeSnippetData,data]);
  }

  const addExample = () =>{
    setExampleData([...exampleData,initialExampleData]);
  }

  useEffect(() => {
     console.log("new CodeSnippetData : ",codeSnippetData);
  }, [codeSnippetData]);

  useEffect(()=>{
    console.log("new Examples : ",exampleData);
  },[exampleData])

  return (
    <>
    <AdminNav/>
    <ConfirmModal show={showConfirmation} onChangeConfirmation={setShowConfirmation} onContinueModal={handleConfirmSubmission}/>
    <h1 className="add-question-heading">Add Question Info</h1>
    <div className="question-container">
      <InputGroup className="mb-3">
        <InputGroup.Text style={{width:"200px",justifyContent:"center"}} id="basic-addon3">Question Name</InputGroup.Text>
        <Form.Control 
        id="basic-url" 
        aria-describedby="basic-addon3" 
        className="form-control"
        onChange={(e)=>{setQuestionName(e.target.value)}} />
      </InputGroup>

      <Form.Group controlId="exampleForm.ControlSelect1" className="mb-3" style={{display:"flex"}}>
        <InputGroup.Text style={{width:"200px",justifyContent:"center"}} id="basic-addon3">Difficulty</InputGroup.Text>
        <Form.Control
          as="select"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="" disabled>Select difficulty</option>
          <option value="Easy">EASY</option>
          <option value="Medium">MEDIUM</option>
          <option value="Hard">HARD</option>
        </Form.Control>
    </Form.Group>

    <Form.Group controlId="exampleForm.ControlSelect1" className="mb-3">
      <div style={{display:"flex"}}>
      <InputGroup.Text style={{width:"200px",justifyContent:"center"}} id="basic-addon3">Topic Tags</InputGroup.Text>
      <Form.Control
        as="select"
        value={'Select'}
        onChange={handleTopicChange}
      >
        <option value="Select" disabled selected>Select Topics</option>
        {availableTopics.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Control>
      </div>
      <div>
        <strong>Selected Tags:</strong>
        <ul>
          {selectedTopics.map((option) => (
            <li key={option}>{option} 
            <button onClick={() => handleRemoveTopics(option)}> del</button>
            </li>
          ))}
        </ul>
      </div>
    </Form.Group>

      <InputGroup className="mb-3">
        <InputGroup.Text style={{width:"200px",justifyContent:"center"}} id="basic-addon3">Question description</InputGroup.Text>
        <Form.Control 
            as="textarea" 
            aria-label="With textarea" 
            className="form-control"
            style={{height : "150px"}}
            onChange={(e)=>{setQuestionDescription(e.target.value)}}
         />
      </InputGroup>
      <strong>Examples : </strong>
      <div className="example-container">
        {exampleData.map((value,index)=>(
          <div key={index}>
            <strong style={{marginLeft:'10px'}}>Example {index+1} :  </strong>
            <Examples index={index} data={value} onChangeData={handleUpdateExamplesData}/>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Button style={{ backgroundColor: 'green', color: 'white' }}
            onClick={addExample}
          >Add</Button>
        </div>
      </div>

      <InputGroup className="textarea-group mb-3">
        <InputGroup.Text style={{width:"200px",justifyContent:"center"}}>Runcases</InputGroup.Text>
        <Form.Control 
            as="textarea" 
            aria-label="With textarea" 
            className="form-control"
            style={{height : "100px"}}
            onChange={(e)=>{
              const array = e.target.value.split('\n');
              setRuncases(array);
            }}
         />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text style={{width:"200px",justifyContent:"center"}} id="basic-addon3">Constraints</InputGroup.Text>
        <Form.Control 
            as="textarea" 
            aria-label="With textarea" 
            className="form-control"
            style={{maxHeight : "100px"}}
            onChange={(e)=>{
              const array = e.target.value.split('\n');
              setConstraints(array);
            }}
         />
      </InputGroup>
      <div>
      {codeSnippetData.map((value,index)=>(
          <CodeSnippet key={index} index={index} data={value} onChangeData={handleUpdateData}/>
      ))}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Button style={{ backgroundColor: 'green', color: 'white' }}
            onClick={addCodeSnippet}
          >Add</Button>
        </div>
      </div>
      <div className="submit-button-container">
          <Button variant="primary" type="submit" className="submit-button"
            onClick={()=>{setShowConfirmation(true)}}
          >
            Submit
          </Button>
        </div>
    </div>

    </>
  );
}

export default AddQuestion;