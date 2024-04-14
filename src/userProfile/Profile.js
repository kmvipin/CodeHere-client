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
import AvatarList from '../components/AvatarList';
import Loading from '../components/Loading';

function ProfilePage() {
    const user = useParams().user;
    const navigate = useNavigate();
    const [currentAvatar,setCurrentAvatar] = useState('https://via.placeholder.com/500');
    const defaultAlertContent = 'You First Login';
    const [profileData, setProfileData] = useState();
    const [editedData, setEditedData] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [alertMessage, setAlertMessage] = useState();
    const [myProfile,setMyProfile] = useState(false);
    const [avatarName, setAvatarName] = useState(null);

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

  const handleNavigateQuestionList=(easy,medium,hard,solved,pending,notAttempted)=>{
      const difficulty = {
        easy : easy,
        medium : medium,
        hard : hard,
      }
      const statusInfo = {
        solved : solved,
        pending : pending,
        notAttempted : notAttempted,
      }
      const questionListReq = {
        difficultyLevel : difficulty,
        statusInfo : statusInfo,
      }

      const serializedData = JSON.stringify(questionListReq);
      try{
        navigate(`/question-list?username=${profileData.person.userName}&&questionListReq=${encodeURIComponent(serializedData)}`);
      }
      catch(err){
        setAlertMessage("Something Went Wrong");
      }
  }

  useEffect(()=>{
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
            setAlertMessage('Something Went Wrong..');
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
    if(profileData && profileData.person.avatarName != null){
      setAvatarName(profileData.person.avatarName);
    }
  },[profileData]);

  useEffect(()=>{
    if(avatarName != null){
      import(`../assets/images/avatar/${avatarName}.jpg`)
      .then((module) => { 
        setCurrentAvatar(module.default);
      })
      .catch((error) => {
        console.error('Error loading avatar:', error);
      });

      setEditedData({ ...editedData,
                      person: {
                        ...editedData.person,
                        avatarName: avatarName
                      } })
    }
  },[avatarName]);

  if(profileData){
  return (
    <div>
      <AlertMessage message={alertMessage} content={defaultAlertContent} setMessage={setAlertMessage}/>
    <Nav isProfilePage={true}/>
    <Container>
      <Row className="mt-4">
        <Col md={5}>
        <Card className="custom-profile-card">
          {myProfile && (!isEditing ? (
            <div className="edit-button" onClick={()=>{setIsEditing(true)}}>
              <i className="fas fa-pencil-alt"></i> Edit
            </div>
          ):(
            <div className="edit-button" onClick={()=>{setIsEditing(false)}}>
              <i className="fas fa-pencil-alt"></i> close
            </div>
          ))}
          <Card.Img variant="top" src={currentAvatar} className="profile-image" />
          {isEditing && <AvatarList setCurrentAvatar={setCurrentAvatar} setAvatarName={setAvatarName}/>}
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

            <ListGroup.Item style={{cursor:'pointer'}} 
            onClick={()=>{handleNavigateQuestionList(true,true,true,true,false,false)}}
              className="list-item">
              Total Questions Solved: {profileData.codeHereProfile.totalQuestionSolved}
             </ListGroup.Item>

            <ListGroup.Item style={{cursor:'pointer'}} 
            onClick={()=>{handleNavigateQuestionList(true,false,false,true,false,false)}}
             className="list-item">
              Easy Questions Solved: {profileData.codeHereProfile.easyQuestionSolved}
              </ListGroup.Item>

            <ListGroup.Item style={{cursor:'pointer'}} 
            onClick={()=>{handleNavigateQuestionList(false,true,false,true,false,false)}} 
            className="list-item">
              Medium Questions Solved: {profileData.codeHereProfile.mediumQuestionSolved}
              </ListGroup.Item>

            <ListGroup.Item style={{cursor:'pointer'}}
             onClick={()=>{handleNavigateQuestionList(false,false,true,true,false,false)}} 
             className="list-item">
              Hard Questions Solved: {profileData.codeHereProfile.hardQuestionSolved}
              </ListGroup.Item>

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
      <Nav isProfilePage={true}/>
      <Loading content={"Loading..."}/>
    </div>
  )
}
}

export default ProfilePage;
