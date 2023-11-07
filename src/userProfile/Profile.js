import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import './Profile.css';
import Nav from '../Header/Nav';
import { useState } from 'react';
import { useEffect } from 'react';
import { getProfileInfo, updatePersonProfile } from '../services/person-service';
import AlertMessage from '../components/AlertMessage';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getPublicProfileInfo } from '../services/public-service';

function generateRandomData() {

    return {
      TotalQuestionSolved: Math.floor(Math.random() * 100),
      EasyQuestionSolved: Math.floor(Math.random() * 50),
      MediumQuestionSolved: Math.floor(Math.random() * 30),
      HardQuestionSolved: Math.floor(Math.random() * 20),
      first_name: 'John',
      last_name: 'Doe',
      image: 'https://via.placeholder.com/500', // Example image URL
      mobileNumber: '123-456-7890',
      email: 'johndoe@example.com',
      userName: 'johndoe123',
      age: Math.floor(Math.random() * 50 + 20),
      date_of_birth: '1990-01-01', // Example date format
      address: '123 Main St, City, Country',
      gitHub: 'https://github.com/johndoe',
      LinkedIn: 'https://linkedin.com/in/johndoe',
      Twitter: 'https://twitter.com/johndoe',
      website: 'https://johndoe.com',
 };
}

function ProfilePage() {
    const user = useParams().user;
    const navigate = useNavigate();
    const defaultImage = 'https://via.placeholder.com/500';
    const initialProfileData = generateRandomData();
    const defaultAlertContent = 'You First Login';
    const [profileData, setProfileData] = useState();
    const [editedData, setEditedData] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [alertMessage, setAlertMessage] = useState();
    const [myProfile,setMyProfile] = useState(false);
  const toggleEdit = () => {
    if (isEditing) {
      // Save the edited data and exit edit mode
      setProfileData({ ...editedData });
    } else {
      // Enter edit mode
      setEditedData({ ...profileData });
    }
  };

  const handleFullNameDisplay=(firstName, lastName)=>{
    let fullName = "";
    if(firstName != null){
      fullName += firstName+" ";
    }
    if(lastName != null){
      fullName += lastName;
    }
    return fullName;
  }

  useEffect(()=>{
    console.log(user)
    if(user === 'my-profile'){
      setMyProfile(true);
      try{
        getProfileInfo()
        .then((data)=>{
          setProfileData(data);
          setEditedData(data);
        })
        .catch((err)=>{
          setAlertMessage('Something Went Wrong');
        })
      }
      catch(err){
        setAlertMessage('Something Went Wrong');
      }
    }
    else{
      try{
        getPublicProfileInfo(user)
        .then(data=>{
          setProfileData(data);
          setEditedData(data);
        })
        .catch((err)=>{
          if(err.response.status){
            navigate(`/pnf`);
          }
          else{
            setAlertMessage('Something Went Wrong');
          }
        })
      }
      catch(err){
        setAlertMessage('Something Went Wrong');
      }
    }
  },[]);

  useEffect(()=>{
    if(profileData && isEditing){
      updatePersonProfile(profileData.person)
      .then((data)=>{
        toast.success("Profile Update Successfully");
      })
      .catch((err)=>{
        setAlertMessage("Something Went Wrong");
      });
      setIsEditing(false);
    }
  },[profileData]);

  if(profileData){
  return (
    <div>
      <AlertMessage message={alertMessage} content={defaultAlertContent} setMessage={setAlertMessage}/>
    <Nav/>
    <Container>
      <Row className="mt-4">
        <Col md={5}>
        <Card className="custom-profile-card">
          {myProfile && !isEditing && (
            <div className="edit-button" onClick={()=>{setIsEditing(true)}}>
              <i className="fas fa-pencil-alt"></i> Edit
            </div>
          )}
          <Card.Img variant="top" src={profileData.person.image ? profileData.image : defaultImage} className="profile-image" />
          <Card.Body>
          <Card.Title className="text-center">
            {isEditing ? (
                <div style={{display:'flex', justifyContent:'space-around'}}>
                <input
                    type="text"
                    value={editedData.person.first_name}
                    onChange={(e) => setEditedData({ ...editedData,
                                                          person: {
                                                            ...editedData.person,
                                                            first_name: e.target.value
                                                          } })}
                    style={{width:'8rem',textAlign:'center'}}
                />
                <input
                    type="text"
                    value={editedData.person.last_name}
                    onChange={(e) => setEditedData({ ...editedData,
                                                          person: {
                                                            ...editedData.person,
                                                            last_name: e.target.value
                                                          } })}
                    style={{width:'8rem',textAlign:'center'}}
                />
                </div>
            ) : (
                handleFullNameDisplay(profileData.person.first_name, profileData.person.last_name)
            )}
            </Card.Title>

            <Card.Text>
            <div className="info">
                <strong>Username:</strong> {isEditing ? (
                <input
                    type="text"
                    value={editedData.person.userName}
                    onChange={(e) => setEditedData({ ...editedData,
                                                        person: {
                                                          ...editedData.person,
                                                          userName: e.target.value
                                                        } })}
                    disabled
                />
                ) : profileData.person.userName}
            </div>
            <div className="info">
                <strong>Email:</strong> {isEditing ? (
                <input
                    type="email"
                    value={editedData.person.email}
                    onChange={(e) => setEditedData({ ...editedData,
                                                        person: {
                                                          ...editedData.person,
                                                          email: e.target.value
                                                        } })}
                />
                ) : profileData.person.email}
            </div>
            <div className="info">
                <strong>Age:</strong> {isEditing ? (
                <input
                    type="number"
                    value={editedData.person.age}
                    onChange={(e) => setEditedData({ ...editedData,
                                                        person: {
                                                          ...editedData.person,
                                                          age: e.target.value
                                                        } })}
                />
                ) : profileData.person.age}
            </div>
            <div className="info">
                <strong>Date of Birth:</strong> {isEditing ? (
                <input
                    type="date"
                    value={editedData.person.date_of_birth}
                    onChange={(e) => setEditedData({ ...editedData,
                                                      person: {
                                                        ...editedData.person,
                                                        date_of_birth: e.target.value
                                                      } })}
                />
                ) : profileData.person.date_of_birth[1]+'-'+profileData.person.date_of_birth[2]+'-'+profileData.person.date_of_birth[0]}
            </div>
            <div className="info">
                <strong>Mobile Number:</strong> {isEditing ? (
                <input
                    type="tel"
                    value={editedData.person.mobileNumber}
                    onChange={(e) => setEditedData({ ...editedData,
                                                        person: {
                                                          ...editedData.person,
                                                          mobileNumber: e.target.value
                                                        } })}
                />
                ) : profileData.person.mobileNumber}
            </div>
            <div className="info">
                <strong>Address:</strong> {isEditing ? (
                <input
                    type="text"
                    value={editedData.person.address}
                    onChange={(e) => setEditedData({ ...editedData,
                                                        person: {
                                                          ...editedData.person,
                                                          address: e.target.value
                                                        } })}
                />
                ) : profileData.person.address}
            </div>
            </Card.Text>
          </Card.Body>
          {isEditing && <Button  onClick={toggleEdit}>save</Button>}
        </Card>
        </Col>
        <Col md={7}>
          <div className="text-center">
            <h2>CodeHere Profile</h2>
          </div>
          <ListGroup className="custom-list">
            <ListGroup.Item className="list-item">Total Questions Solved: {profileData.codeHereProfile.totalQuestionSolved}</ListGroup.Item>
            <ListGroup.Item className="list-item">Easy Questions Solved: {profileData.codeHereProfile.easyQuestionSolved}</ListGroup.Item>
            <ListGroup.Item className="list-item">Medium Questions Solved: {profileData.codeHereProfile.mediumQuestionSolved}</ListGroup.Item>
            <ListGroup.Item className="list-item">Hard Questions Solved: {profileData.codeHereProfile.hardQuestionSolved}</ListGroup.Item>
          </ListGroup>
          <div className="text-center mt-4">
            <h2>Social Handles</h2>
          </div>
          <ListGroup className="custom-list">
            <ListGroup.Item className="list-item">
              <a href={profileData.person.gitHub}>GitHub</a>
              <input
                type='text'
                defaultValue={profileData.person.gitHub}
                onChange={(e)=>setEditedData({...editedData,
                                  person: {
                                    ...editedData.person,
                                    gitHub: e.target.value
                                  }})}
                disabled = {!isEditing}
              />
            </ListGroup.Item>
            <ListGroup.Item className="list-item">
              <a href={profileData.person.linkedIn}>LinkedIn</a>
              <input
                type='text'
                defaultValue={profileData.person.linkedIn}
                onChange={(e)=>setEditedData({...editedData,
                                                person: {
                                                  ...editedData.person,
                                                  linkedIn: e.target.value
                                                }})}
                disabled={!isEditing}
              />
            </ListGroup.Item>
            <ListGroup.Item className="list-item">
              <a href={profileData.person.twitter}>Twitter</a>
              <input
                type='text'
                defaultValue={profileData.person.twitter}
                onChange={(e)=>setEditedData({...editedData,
                                                person: {
                                                  ...editedData.person,
                                                  twitter: e.target.value
                                                }})}
                disabled={!isEditing}
              />
            </ListGroup.Item>
            <ListGroup.Item className="list-item">
              <a href={profileData.person.website}>Website</a>
              <input
                type='text'
                defaultValue={profileData.person.website}
                onChange={(e)=>setEditedData({...editedData,
                                                  person: {
                                                    ...editedData.person,
                                                    website: e.target.value
                                                  }})}
                disabled={!isEditing}
              />
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
    </div>
  );
}
else{
  return(
    <div>
      <AlertMessage message={alertMessage} content={defaultAlertContent} setMessage={setAlertMessage}/>
          Loading...
      </div>
  )
}
}

export default ProfilePage;
