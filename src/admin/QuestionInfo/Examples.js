import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useEffect, useState } from "react";
import './Examples.css';

const Eaxmples = (props) => {
    const {index, data, onChangeData} = props;
    const [example,setExample] = useState(data);
    const IOTextStyle = {
        width : '100px',
        justifyContent : 'center',
        height : ''     //here height sync with IOFormStyle Height
    }
    const IOFormStyle = {
        height : '120px',
        maxWidth : '300px'
    }

    useEffect(()=>{
        console.log(example);
        onChangeData(index,example);
    },[example])
  return (
    <div>
        <div className="input-output-container">
            <InputGroup className="mb-3">
                <InputGroup.Text style={IOTextStyle}>Input</InputGroup.Text>
                <Form.Control 
                    as="textarea" 
                    aria-label="With textarea" 
                    className="form-control"
                    defaultValue={data.input.join('\n')}
                    style={IOFormStyle}
                    onChange={(e)=>{
                        const inputArray = e.target.value.split('\n');
                        setExample({ ...example, input: inputArray });
                    }}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text style={IOTextStyle}>Output</InputGroup.Text>
                <Form.Control 
                    as="textarea" 
                    aria-label="With textarea" 
                    className="form-control"
                    defaultValue = {data.output.join('\n')}
                    style={IOFormStyle}
                    onChange={(e)=>{
                        const outputArray = e.target.value.split('\n');
                        setExample({ ...example, output: outputArray });
                    }}
                />
            </InputGroup>
        </div>
        <InputGroup className="mb-3">
            <InputGroup.Text style={{width : IOTextStyle.width}}>Explanation</InputGroup.Text>
            <Form.Control 
                as="textarea" 
                aria-label="With textarea" 
                className="form-control"
                defaultValue={data.explanation}
                style={{height:'100px'}}
                onChange={(e)=>{
                    setExample({...example,explanation:e.target.value});
                }}
            />
        </InputGroup>

    </div>
  )
}

export default Eaxmples