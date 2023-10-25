import React from 'react';
import './QuestionInfo.css';
import { useEffect } from 'react';

const QuestionInfo = (props) => {
  const { name, difficulty, topicTags, description, examples, constraints } = props.questionInfo;

  return (
    <div className="question-details">
      <h1 className="question-title" style={{ textAlign: 'left', fontSize: '24px', overflow : 'hidden' }}>
        {name}
      </h1>
      <div className="details">
        <div className="difficulty-and-tags">
          <div
            className="detail"
            style={{
              border: '1px solid #ddd',
              display:'flex',
              overflow : 'hidden',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#f8f9fa',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              margin: '5px',
              width: '48%', // Adjust the width as needed
            }}
          >
            <strong style={{ fontWeight: 'bold', color: '#333' }}>
              Difficulty:
            </strong>
            <div
              style={{
                color:
                  difficulty === 'EASY'
                    ? 'green'
                    : difficulty === 'MEDIUM'
                    ? 'yellow'
                    : difficulty === 'HARD'
                    ? 'red'
                    : 'black',
              marginLeft:'5px'}}
            >
              {difficulty}
          </div>
          </div>
          <div
            className="detail"
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#f8f9fa',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              margin: '5px',
              width: '48%', // Adjust the width as needed
              overflowX : 'hidden'
            }}
          >
            <strong style={{ fontWeight: 'bold', color: '#333' }}>
              Topic Tags:
            </strong>{' '}
            {topicTags && topicTags.join(' | ')}
          </div>
        </div>
        <div style={{marginTop:"10px"}}>
          <strong>Description: </strong> 
          <span style={{ whiteSpace: 'pre-line' }}>{description}</span>
        </div>
      </div>
      {examples && (
        <div className="examples-container">
          {examples.map((example, index) => (
            <div className="example-box" key={index}>
              <h2>Example {index + 1} :</h2>
              <div style={{paddingLeft:"25px"}}>
                    <div>
                        <strong>Input:</strong>
                        <ul style={{listStyleType: 'none'}}>
                        {example.input.map((inputItem, inputIndex) => (
                            <li key={inputIndex}>{inputItem}</li>
                        ))}
                        </ul>
                    </div>
                    <div>
                        <strong>Output:</strong>
                        <ul style={{listStyleType: 'none'}}>
                        {example.output.map((outputItem, outputIndex) => (
                            <li key={outputIndex}>{outputItem}</li>
                        ))}
                        </ul>
                    </div>
                </div>
              {example.image && (
                <div>
                  <strong>Image:</strong>
                  <img src={example.image} alt="Example Image" />
                </div>
              )}
              {example.explanation && (
                <div>
                  <strong>Explanation:</strong>
                  <span style={{ whiteSpace: 'pre-line'}}>{'\n'+example.explanation}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {constraints && constraints.length > 0 && (
        <div className="constraints">
          <h2>Constraints</h2>
          <ul>
            {constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestionInfo;
