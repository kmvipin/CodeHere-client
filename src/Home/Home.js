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

const Home = () =>{
  const navigate = useNavigate();

  const handleSubmitForm = (message,setFieldNull) =>{
    try{
        saveMessage(message)
        .then((res)=>{
          console.log(res);
          setFieldNull();
        })
        .catch(err=>{
          console.error(err);
        })
    }
    catch(err){
      console.error(err);
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
    description: "This have `EASY` category where you can start",
    color : 'green'
  };
  const MediumCategory = {
    name : "MEDIUM",
    description : "This have `MEDIUM` category Question which you tried after good practice on easy questions",
    color : '#caca09'
  };
  const HardCategory = {
    name : "HARD",
    description : "This have `HARD` category question which you tried after good practice on medium questions",
    color : 'red'
  }
  // Import testimonial components, content, and other necessary components

  return (
    <div className='app'>
      <Nav />
      <section id="home" className="hero">
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
