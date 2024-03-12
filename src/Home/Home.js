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
import Header from '../Header/Header';

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
        easy : easy,
        medium : medium,
        hard : hard,
      }
      const statusInfo = {
        pending : true,
        solved : true,
        notAttempted : true,
      }
      const questionListReq = {
        difficultyLevel : difficulty,
        statusInfo : statusInfo,
      }

      const serializedData = JSON.stringify(questionListReq);
      navigate(`/question-list?questionListReq=${encodeURIComponent(serializedData)}`);
  }

  const navigateToList = (difficulty) =>{
    if(difficulty === "EASY"){
      handleNavigateQuestionList(true,false,false);
    }
    else if(difficulty === "MEDIUM"){
      handleNavigateQuestionList(false,true,false);
    }
    else{
      handleNavigateQuestionList(false,false,true);
    }
  }

  const EasyCategory ={
    name : "EASY",
    description: "Questions are easy.",
    quantity : 4,
  };
  const MediumCategory = {
    name : "MEDIUM",
    description : "Questions are moderate.",
    quantity : 1,
  };
  const HardCategory = {
    name : "HARD",
    description : "Questions are hard",
    quantity : 1,
  }
  // Import testimonial components, content, and other necessary components

  return (
    <div className='app'>
      <Nav isFixed={true}/>
      <AlertMessage message={alertMessage} content="Check yout internet connection or try again" setMessage={setAlertMessage}/>
      <Header handleNavigateQuestionList={handleNavigateQuestionList}/>
      <hr className="mx-5"></hr>
      <div className='bottom-container'>
      <section id="features" className="section w-full py-12">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:gap-10 md:px-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore by Difficulty</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Choose your level of difficulty and start practicing.
              </p>
            </div>
          </div>
        <div className="container grid max-w-3xl items-center justify-center gap-4 px-4 md:gap-8 md:px-6 lg:grid-cols-3 mt-20">
            <CategoryCard {...EasyCategory} navigateToList={navigateToList}/>
            <CategoryCard {...MediumCategory} navigateToList={navigateToList}/>
            <CategoryCard {...HardCategory} navigateToList={navigateToList}/>
          {/* Add more CategoryCard components for additional categories */}
        </div>
      </section>
      <hr className="mx-5"></hr>
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
