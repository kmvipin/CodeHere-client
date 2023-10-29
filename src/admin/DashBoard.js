import React from 'react';
import { Container } from 'react-bootstrap';
import './DashBoard.css';
import AdminNav from './AdminNav';
import { useNavigate } from 'react-router-dom';
import AdminDashBoardCard from './AdminDashBoardCard';

function App() {
    const navigate = useNavigate();
    const AddQuestion = {
      title : 'Add Question',
      text : 'Click here to add a new question to your database.',
      color: "#ff7f50"
    };
    const AddTestCases = {
      title:"Add Test Cases",
      text:"Manage and add test cases for your questions.",
      color:"#6cb2eb"
    };
    const UserMessage = {
      title:"User Messages",
      text:"View and respond to user messages and inquiries.",
      color:"#51d8a9"
    };
    const AdminQuestionList={
      title:"Question List",
      text:"Update and Delete Question",
      color:"orange"
    };

    const handleNavigateQuestionList=(easy,medium,hard)=>{
      const difficulty = {
        easy : false,
        medium : false,
        hard : false,
      }
      if(easy){
        difficulty.easy = true;
      }
      if(medium){
        difficulty.medium = true;
      }
      if(hard){
        difficulty.hard = true;
      }
      const serializedData = JSON.stringify(difficulty);
      navigate(`/admin2023/question-list?difficulty=${encodeURIComponent(serializedData)}`);
  }

  return (
    <div>
      <AdminNav/>
      <Container className='admin-dashboard-container-card'>
            <div onClick={()=>{navigate("/admin2023/add-question")}}>
              <AdminDashBoardCard {...AddQuestion}/>
            </div>
            <div onClick={()=>{navigate("/admin2023/add-testcases")}}>
              <AdminDashBoardCard {...AddTestCases}/>
            </div>
            <div>
              <AdminDashBoardCard {...UserMessage}/>  
            </div>
            <div onClick={()=>{handleNavigateQuestionList(true,true,true)}}>
              <AdminDashBoardCard {...AdminQuestionList}/>
            </div>
      </Container>
    </div>
  );
}

export default App;
