import React from 'react';
import './QuestionInfo.css';

const QuestionInfo = (props) => {
  const { name, difficulty, topicTags, description, examples, constraints } = props.questionInfo;

  return (
    <div className="question-details h-[calc(100%-2.5rem)] md:h-[calc(100%-3rem)] pb-4 pl-4 pr-2 whitespace-pre-wrap">
      <h1 className="question-title" style={{ textAlign: 'left', fontSize: '24px', overflow : 'hidden' }}>
        {name}
      </h1>
      <div className="details">
        <div className="difficulty-and-tags flex flex-wrap sm:flex-nowrap text-center justify-center">
          <div
            className="detail border border-[#ddd] flex flex-wrap overflow-hidden p-2 bg-[#f8f9fa]  w-[48%] justify-center items-center"
            style={{
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <strong className="font-bold text-[#333]">
              Difficulty:
            </strong>
            <div
              style={{
                color:
                  difficulty === 'EASY'
                    ? 'green'
                    : difficulty === 'MEDIUM'
                    ? '#c8c804'
                    : difficulty === 'HARD'
                    ? 'red'
                    : 'black',
              marginLeft:'5px'}}
            >
              {difficulty}
          </div>
          </div>
          <div
            className="detail border border-[#ddd] p-2 bg-[#f8f9fa] m-1 w-[48%] overflow-x-hidden"
            style={{
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
          <span><div dangerouslySetInnerHTML={{ __html: description }}/></span>
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
                            <li key={inputIndex} style={{whiteSpace:'pre'}}>{inputItem}</li>
                        ))}
                        </ul>
                    </div>
                    <div>
                        <strong>Output:</strong>
                        <ul style={{listStyleType: 'none'}}>
                        {example.output.map((outputItem, outputIndex) => (
                            <li key={outputIndex} style={{whiteSpace:'pre'}}>{outputItem}</li>
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
