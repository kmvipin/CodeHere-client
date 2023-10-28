import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import './DashBoard.css';
import AdminNav from './AdminNav';
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();
  return (
    <div>
        <AdminNav/>
      <Container className='dashboard-container-card'>
        <Row>
          <Col md={4}>
            <Card className="custom-card add-question" onClick={()=>{navigate('/admin2023/add-question')}}>
              <Card.Body>
                <Card.Title>Add Question</Card.Title>
                <Card.Text>
                  Click here to add a new question to your database.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="custom-card add-test-cases" onClick={()=>{navigate('/admin2023/addtestcases')}}>
              <Card.Body>
                <Card.Title>Add Test Cases</Card.Title>
                <Card.Text>
                  Manage and add test cases for your questions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="custom-card user-messages">
              <Card.Body>
                <Card.Title>User Messages</Card.Title>
                <Card.Text>
                  View and respond to user messages and inquiries.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
