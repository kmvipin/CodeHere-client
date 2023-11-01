import Nav from '../Header/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryCard from '../Home/CategoryCard';
import './Home.css';
import ContactForm from './ContactForm';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { saveMessage } from '../services/public-service';
import { toast } from 'react-toastify';
import AlertMessage from '../components/AlertMessage';
import { useState } from 'react';

const Home = () =>{
  const [alertMessage, setAlertMessage] = useState();
  const navigate = useNavigate();

  const handleSubmitForm = (message,setFieldNull) =>{
    try{
        saveMessage(message)
        .then((res)=>{
          toast.success("Message Sent Successfully");
          setFieldNull();
        })
        .catch(err=>{
          setAlertMessage("Something Went Wrong");
        })
    }
    catch(err){
      setAlertMessage("Something Went Wrong");
    }
  }
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
      navigate(`/question-list?difficulty=${encodeURIComponent(serializedData)}`);
  }
  const EasyCategory ={
    name : "EASY",
    description: "It contains `EASY` category question where you can start",
    color : '#03b903'
  };
  const MediumCategory = {
    name : "MEDIUM",
    description : "It contains `MEDIUM` category Question which you tried after good practice on easy questions",
    color : 'rgb(204, 204, 7)'
  };
  const HardCategory = {
    name : "HARD",
    description : "It contains `HARD` category question which you tried after good practice on medium questions",
    color : '#ff2e2e'
  }
  // Import testimonial components, content, and other necessary components

  return (
    <div className='app'>
      <Nav />
      <AlertMessage message={alertMessage} content="Check yout internet connection or try again" setMessage={setAlertMessage}/>
      <section id="home" className="hero">
          <div className='box'>
            <div className="name"> 
              <h1 >CODE</h1>
              <h1 >HERE</h1>
            </div>
            <div className='quote'>
              <p>YOUR ONE STOP DESTINATION</p>
              <p>FOR EXCITING CHALLENGES!</p>
            </div>
          </div>
        <a className="cta-button" onClick={()=>{handleNavigateQuestionList(true,true,true)}}>Get Started</a>
      </section>
      <div className='bottom-container'>
      <section id="features" className="section">
        <h2 className="section-title">Featured Categories</h2>
        <div className="category-container">
          <div onClick={()=>{handleNavigateQuestionList(true,false,false)}}>
            <CategoryCard {...EasyCategory} />
          </div>
          <div onClick={()=>{handleNavigateQuestionList(false,true,false)}}>
            <CategoryCard {...MediumCategory} />
          </div>
          <div onClick={()=>{handleNavigateQuestionList(false,false,true)}}>
            <CategoryCard {...HardCategory}/>
          </div>
          {/* Add more CategoryCard components for additional categories */}
        </div>
      </section>
      <Container id="about" className="about-section">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h2 className="section-title" style={{marginTop:'10px'}}>About Us</h2>
                <p>
                  We are passionate about providing you with exciting challenges that help you learn and grow. 
                  Join our community and embark on a journey of self-improvement and fun.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <section id="contact" className="contact-section">
        <h2 className="section-title">Contact Us</h2>
        <ContactForm handleSubmitForm={handleSubmitForm}/>
        {/* Add additional contact information if needed */}
      </section>
      </div>
    <Footer/>
    </div>
  );
  
  
}

export default Home;
