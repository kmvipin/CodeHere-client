import React, { useEffect } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import { useState } from 'react';
import './Question.css'; // Import your custom CSS if needed
import CodeEditor from './CodeEditor';
import Nav from '../Header/Nav';
import QuestionInfo from './QuestionInfo';
import Result from './Result';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Comments from './Comments';
import ReactLoading from 'react-loading';
import { getQuestionByName } from '../services/question-service';
import AlertMessage from '../components/AlertMessage';
import { getUserSolution, runSolution,submitSolution } from '../services/solution-service';
import { useLocation } from 'react-router-dom';
import { isLogin } from '../auth';

function Question() {

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const questionName = query.get('name');;
  const [verticalSizes, setVerticalSizes] = useState([300, '30%', 'auto']);
  const [horizontalSizes, setHorizontalSizes] = useState([700, '50%', 'auto']);
  const [code, setCode] = useState('');
  const [data,setData] = useState();
  const [result,setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [submit,setSubmit] = useState(false);
  const [run,setRun] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [isUserLogin, setIsuserLogin] = useState(isLogin());
  const [selectedLanguage, setSelectedLanguage] = useState("JAVA");
  const [isVerticalSplit, setIsVerticalSplit] = useState(window.innerWidth <= 800);
  const handleUpdateCode = (newCode) =>{
      setCode(newCode);
  }

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    backgroundColor:'#e9ecec',
    overflow : 'auto'
  };

  const setQuestionInfo = (info) =>{
    const temp = {
        codeSnippets : info.codeSnippets,
        questionInfo : {
          name : info.name,
          description : info.question,
          runCase : info.runCase,
          status : info.status,
          difficulty : info.difficulty,
          examples : info.examples,
          constraints : info.constraints,
          exampleCount : info.exampleCount,
          testCaseCount : info.testCaseCount,
          topicTags : info.topicTags
        }
    }
    setData(temp);
  }

  const handleSetCode=(QuestionData,language)=>{
    const code = QuestionData.codeSnippets.find((item) => item.language === language);
    if(code == null){
      setAlertMessage('Language Not Found');
    }
    else{
      setCode(code.solutionPrototype);
    }
  }

  const handleNavSync=()=>{
    setIsuserLogin(!isUserLogin);
  }

const onRunHandle = () => {
    setSubmit(false);
    setRun(true);
    setLoading(true);
    const data = {
      questionName: questionName,
      solution: code,
      languageType: selectedLanguage
    }
    try {
        runSolution(data)
          .then(response => {
            setResult(response);
            setLoading(false); // Set loading to false when the request is complete
          })
          .catch(error => {
            setAlertMessage('something went wrong')
          });
    } catch (error) {
      setAlertMessage('something went wrong')
      setLoading(false); // Set loading to false in case of an exception
    }
}

  const onSubmitHandle =()=>{
    setRun(false);
    setSubmit(true);
    setLoading(true);

    const data = {
      questionName: questionName,
      solution: code,
      languageType: selectedLanguage
    }
    try {
        submitSolution(data)
        .then(response => {
          setResult(response);
          setLoading(false); // Set loading to false when the request is complete
        })
        .catch(error => {
          setAlertMessage('Something Went Wrong');
        });
    } catch (error) {
      setAlertMessage('Something Went Wrong');
      setLoading(false); // Set loading to false in case of an exception
    }
  }


  useEffect(()=>{
    const fetchData = async () => {
      setQuestionLoading(true);

      try{
        getQuestionByName(questionName)
        .then(data=>{
          if(isLogin()){
            getUserSolution(questionName,selectedLanguage)
            .then(res=>{
              setCode(res);
              setQuestionInfo(data);
              setQuestionLoading(false);
            })
            .catch(err=>{
              setAlertMessage(err.message);
            })
          }
          else{
            setQuestionInfo(data);
            handleSetCode(data,selectedLanguage);
            setQuestionLoading(false);
          }
        })
        .catch(error=>{
          if(error.code === 'ERR_NETWORK'){
            setAlertMessage(error.message);
          }else{
            setAlertMessage('Something Went Wrong');
          }
        })
      }
      catch(error){
        setAlertMessage('Something Went Wrong');
      }
    };

    fetchData();
  },[isUserLogin]);

  useEffect(() => {

    const handleResize = () => {
      setIsVerticalSplit(window.innerWidth <= 800);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <AlertMessage message={alertMessage} content='Try Re-Login And Refresh' setMessage={setAlertMessage}/>
    <Nav loginSignupSync={handleNavSync}/>
    <div className="split-pane question">
      <SplitPane split={!isVerticalSplit ? 'vertical' : 'horizontal'} sizes={verticalSizes} onChange={setVerticalSizes}>
        <Pane minSize={50} maxSize="50%" style={
                                                {
                                                  backgroundColor: 'white',
                                                  ...(isVerticalSplit
                                                    ? { borderBottom: '4px solid #e0e0e0' }
                                                    : { borderRight: '4px solid #e0e0e0' }
                                                  )
                                                }
                                              }>
            <div className='h-full'>
              <Tabs
                defaultActiveKey="description"
                id="uncontrolled-tab-example"
                style={{"--bs-nav-link-color" : "#0000009c","--bs-nav-link-hover-color" : 'black'}}
              >
                <Tab eventKey="description" title="Description" className='h-full'>
                  {!questionLoading ? (<div style={{ ...layoutCSS }}>
                      <QuestionInfo questionInfo = {data.questionInfo}/>
                  </div>) : (
                    <div style={{display:'flex', justifyContent:'center', alignItems :'center',height:'85vh'}}>
                        <ReactLoading type={'bubbles'} color={'grey'} height={80} width={80} />
                    </div>
                  )
                  }
                </Tab>
                <Tab eventKey="comments" title="Comments">
                  <div style={{overflow:'auto'}} className='h-full'>
                    <Comments questionName={questionName} isLogin={isUserLogin}/>
                  </div>
                </Tab>
                <Tab eventKey="customtc" title="CustomTC" disabled>
                  
                </Tab>
            </Tabs>
          </div>
        </Pane>
        <Pane className="right-panel">
          <SplitPane split="horizontal" sizes={horizontalSizes} onChange={setHorizontalSizes}>
            <Pane minSize={50} maxSize="90%" >
              <div className='h-full'>
                <CodeEditor name="codehere-impl" language="java" initialData={code}
                onUpdateData={handleUpdateCode} onRun={onRunHandle} onSubmit={onSubmitHandle} isUserLogin={isUserLogin}
                setLanguage={setSelectedLanguage}/>
              </div>
            </Pane>
            <Pane minSize={50} maxSize="50%">
            <div className='h-full flex'>
              <Result data={result} loading={loading} isRun={run} isSubmit={submit}/>
            </div>
            </Pane>
          </SplitPane>
        </Pane>
      </SplitPane>
    </div>
    </>
  );
}

export default Question;