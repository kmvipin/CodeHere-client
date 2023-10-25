import React from 'react'
import './PageNotFound.css';
const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <header className="pnf-header">
        <h1><b>Error 404 !</b></h1>
        <h1>Page Not Found</h1>
      </header>
      
      <div className="pnf-container">
        <p>You might be search for another page.</p>
        <a href="/" className="pnf-btn">Go Home</a>
      </div>
    </div>
  )
}

export default PageNotFound