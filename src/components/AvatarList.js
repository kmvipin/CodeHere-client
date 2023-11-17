import React, { useState } from 'react';

import avatar1 from '../assets/images/avatar/enjoying.jpg';
import avatar2 from '../assets/images/avatar/fashion-boy.jpg';
import avatar3 from '../assets/images/avatar/mafia.jpg';
import avatar4 from '../assets/images/avatar/normal.jpg';
import avatar5 from '../assets/images/avatar/spy.jpg';
import avatar6 from '../assets/images/avatar/stare.jpg';
import avatar7 from '../assets/images/avatar/with-earphone.jpg';

const AvatarList = (props) => {
  // Replace these with actual avatar image URLs
  const {setCurrentAvatar, setAvatarName} = props;
  const avatarImages = [avatar1,avatar2,avatar3,avatar4,avatar5,avatar6,avatar7];

  const handleAvatarClick = (index) => {
    const selectedAvatarUrl = avatarImages[index];

    // Create an anchor element and set its href to the relative URL
    const anchor = document.createElement('a');
    anchor.href = selectedAvatarUrl;

    // Extract the pathname (filename)
    const name = selectedAvatarUrl.split('/').pop().split('.');
    const avatarName = name[0];

    setCurrentAvatar(selectedAvatarUrl);
    setAvatarName(avatarName);
    console.log(`Selected Avatar: ${avatarName}`);
  };

  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <div style={{ display: 'flex',width:'150px', overflowX: 'auto' }}>
        {avatarImages.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px',cursor:'pointer' }}
            onClick={() => handleAvatarClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarList;
