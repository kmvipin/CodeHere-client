import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './AddTestCases.css';
import AdminNav from './AdminNav';
import { addTestCases } from '../services/admin/admin-service';

const AddTestCases=()=> {
  const [questionName, setQuestionName] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Parse the JSON input
      const parsedData = JSON.parse(jsonData);
      setSubmittedData({ questionName, jsonData: parsedData });
      try{
          addTestCases(questionName,parsedData)
          .then((data)=>{
            console.log(data);
          })
          .catch(error=>{
            console.error(error);
          })
      }
      catch(error){
        console.error(error);
      }
    } catch (error) {
      console.error('Invalid JSON input:', error);
    }
    console.log(submittedData);
  };
  useEffect(()=>{
    console.log(submittedData);
  },[submittedData]);
  return (
    <div>
        <AdminNav/>
    <Container>
      <h1>JSON Input Form</h1>
      <div>
      <Form onSubmit={handleSubmit} className='testcase-container'>
        <Form.Group controlId="questionName">
          <Form.Label>Question Name</Form.Label>
          <Form.Control
            type="text"
            value={questionName}
            onChange={(e) => setQuestionName(e.target.value)}
            placeholder="Enter question name..."
          />
        </Form.Group>
        <Form.Group controlId="jsonInput">
          <Form.Label>Enter JSON Object</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder="Enter JSON here..."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
      {submittedData && (
        <div className="mt-4">
          <h2>Submitted Data:</h2>
          <p><strong>Question Name:</strong> {submittedData.questionName}</p>
          <h3><strong>JSON Data:</strong></h3>
          <pre>{JSON.stringify(submittedData.jsonData, null, 2)}</pre>
        </div>
      )}
    </Container>
    </div>
  );
}

export default AddTestCases;
