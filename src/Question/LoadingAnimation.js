import React from 'react'
import Placeholder from 'react-bootstrap/Placeholder';

const LoadingAnimation = () => {
  return (
    <div style={{padding:'2rem 10px 10px 10px'}}>
        <Placeholder as="p" animation="glow">
        <Placeholder xs={5}/>
        </Placeholder>
        <Placeholder as="p" animation="wave">
        <Placeholder xs={8} />
        </Placeholder>
        <Placeholder as="p" animation="glow">
        <Placeholder xs={10} />
        </Placeholder>
        <Placeholder as="p" animation="wave">
        <Placeholder xs={10} />
        </Placeholder>
    </div>
  )
}

export default LoadingAnimation