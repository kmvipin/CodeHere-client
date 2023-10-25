import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './ContactForm.css'; // Import your CSS file

function ContactForm(props) {
  const {handleSubmitForm} = props;
  // Define state variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitForm({"name" : name,"email":email,"message":message}, setFieldNull);
  };

  const setFieldNull = () =>{
    // Reset form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  }

  return (
    <Container className="contact-form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="form-group">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </Form.Group>

        <Form.Group controlId="email" className="form-group">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </Form.Group>

        <Form.Group controlId="message" className="form-group">
          <Form.Label className="form-label">Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="form-control"
          />
        </Form.Group>

        <Button type="submit" className="submit-button">Submit</Button>
      </Form>
    </Container>
  );
}

export default ContactForm;
