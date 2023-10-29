import './AdminDashBoardCard.css'
import { Card } from 'react-bootstrap'

import React from 'react'

const AdminDashBoardCard = (props) => {
    const {title,text,color} = props;
  return (
    <Card className="custom-card add-question" style={{backgroundColor:color}}>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
                {text}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default AdminDashBoardCard