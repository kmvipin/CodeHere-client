import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import './AddQuestion.css'; // Import the CSS file you created
import "react-ace";
import "ace-builds/src-noconflict/mode-java"; // Import the Java mode
import CodeSnippet from "./CodeSnippet";
import Examples from "./Examples";
import ConfirmModal from "./ConfirmModal";
import AdminNav from "../AdminNav";
import { saveQuestionInfo, updateQuestion } from "../../services/admin/admin-service";
import { useLocation } from 'react-router-dom';
import { getQuestionByName } from "../../services/question-service";
import AlertMessage from "../../components/AlertMessage";
import DeleteIcon from '../../assets/images/del-icon.png'
import { toast } from "react-toastify";


function AddQuestion() {

  const url = useLocation();

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
  const [questionStatus, setQuestionStatus] = useState("ADD");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questionId, setQuestionId] = useState();
  const [exampleData, setExampleData] = useState([]);
  const [codeSnippetData, setCodeSnippetData] = useState([]);
  const [availableTopics, setAvailableTopics] = useState(["ARRAY", "STRING", "RECURSION","LOOPS","INTEGER","If-Else"]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [questionName,setQuestionName] = useState();
  const [questionDescription, setQuestionDescription] = useState();
  const [runcases, setRuncases] = useState([]);
  const [constraints, setConstraints] = useState([]);
  const [alertMessage, setAlertMessage] = useState();

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
    if(questionStatus === "ADD"){
      handleSubmitQuestion(question);
    }
    else{
      handleUpdateQuestion(question);
    }

    console.log('question : ',question);
    console.log('Submitted SuccessFully');
  }

  const handleSubmitQuestion=(question)=>{
    try{
      saveQuestionInfo(question)
      .then((data)=>{
        console.log("Successfully Saved : ",data);
        if(data.success === true){
          toast.success("Question Save Successfully");
        }
        else{
          toast.error(data.message);
        }
      })
      .catch((error)=>{
        toast.error("see console");
        console.error(error);
      });
    }
    catch(err){
      setAlertMessage("Something Went Wrong");
    }
  }

  const handleUpdateQuestion=(question)=>{
    try{
      updateQuestion(questionId,question)
      .then((data)=>{
        if(data.success === true){
          toast.success("Question Update SuccessFully");
        }
        else{
          toast.error(data.message);
        }
      })
      .catch((err)=>{
        console.error(err);
          toast.error("see console");
      })
    }
    catch(err){
      setAlertMessage("Somethinf Went Wrong");
    }
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

  const handleDeleteExample=(index)=>{
    exampleData.splice(index,1);
    setExampleData([...exampleData]);
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

  const handleDelSnippetData=(index)=>{
    codeSnippetData.splice(index,1);
    setCodeSnippetData([...codeSnippetData]);
  }

  const addExample = () =>{
    setExampleData([...exampleData,initialExampleData]);
  }

  useEffect(()=>{
    console.log("new Examples : ",exampleData);
  },[exampleData]);

  useEffect(()=>{
    const path = url.pathname;
    if(path === "/admin2023/update-question"){
      setQuestionStatus("UPDATE");
      const searchParams = new URLSearchParams(url.search);
      const questionName = searchParams.get('question-name');

      try{
        getQuestionByName(questionName)
        .then(data=>{
          setQuestionId(data.question_id);
          setQuestionName(data.name);
          setSelectedDifficulty(data.difficulty);
          setExampleData(data.examples);
          setCodeSnippetData(data.codeSnippets);
          if(data.topicTags)
            setSelectedTopics(data.topicTags);
          setQuestionDescription(data.question);
          setRuncases(data.runCase);
          if(data.constraints)
            setConstraints(data.constraints);
        })
        .catch(error=>{
          setAlertMessage("Something Went Wrong");
        });
      }
      catch(error){
        setAlertMessage("Something Went Wrong");
      }
    }
    else{
      setCodeSnippetData([initialCodeSnippetData]);
      setExampleData([initialExampleData]);
    }
  },[]);

  return (
    <>
    <AdminNav/>
    <AlertMessage message={alertMessage} content="refresh/login or try again" setMessage={setAlertMessage}/>
    <ConfirmModal message="Are You Confirm To Submit This Question" show={showConfirmation} 
    onChangeConfirmation={setShowConfirmation} onContinueModal={handleConfirmSubmission} cnfmBtnVariant="primary"/>
    <h1 className="add-question-heading">Add Question data</h1>
    <div className="question-container">
      <InputGroup className="mb-3">
        <InputGroup.Text style={{width:"200px",justifyContent:"center"}} id="basic-addon3">Question Name</InputGroup.Text>
        <Form.Control 
        disabled={questionStatus === "ADD" ? false : true}
        id="basic-url" 
        aria-describedby="basic-addon3" 
        className="form-control"
        value={questionName}
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
            value={questionDescription}
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
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div class="del-btn"
            onClick={()=>{handleDeleteExample(0)}}>
            <img src={DeleteIcon} alt="Delete"/>
        </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button style={{ backgroundColor: 'green', color: 'white' }}
              onClick={addExample}
            >Add</Button>
          </div>
        </div>
      </div>

      <InputGroup className="textarea-group mb-3">
        <InputGroup.Text style={{width:"200px",justifyContent:"center"}}>Runcases</InputGroup.Text>
        <Form.Control 
            as="textarea" 
            aria-label="With textarea" 
            className="form-control"
            style={{height : "100px"}}
            defaultValue={runcases.join('\n')}
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
            defaultValue={constraints.join('\n')}
            onChange={(e)=>{
              const array = e.target.value.split('\n');
              setConstraints(array);
            }}
         />
      </InputGroup>
      <div>
      {codeSnippetData.map((value,index)=>(
          <CodeSnippet key={index} index={index} data={value} onChangeData={handleUpdateData} onDelSnippet={handleDelSnippetData}/>
      ))}
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
      <div class="del-btn"
          onClick={()=>{handleDelSnippetData(0)}}>
          <img src={DeleteIcon} alt="Delete"/>
      </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Button style={{ backgroundColor: 'green', color: 'white' }}
            onClick={addCodeSnippet}
          >Add</Button>
        </div>
      </div>
      </div>
      <div className="submit-button-container">
          {questionStatus === "ADD" ? <Button variant="primary" type="submit" className="submit-button"
            onClick={()=>{setShowConfirmation(true)}}
          >
              ADD
          </Button> :
          <Button variant="primary" type="submit" className="submit-button"
            onClick={()=>{setShowConfirmation(true)}}
          >
              UPDATE
          </Button>}
        </div>
    </div>

    </>
  );
}

export default AddQuestion;