import React from 'react';
import './QuestionList.css';
import Nav from '../Header/Nav';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getQuestionListByDifficulty, getQuestionListInfo } from '../services/question-service';
import { useState } from 'react';
import AlertMessage from '../components/AlertMessage';
import { Container, Table } from 'react-bootstrap';
import DynamicPagination from '../components/DynamicPagination';
import ReactLoading from 'react-loading';

const QuestionList = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const errMssg = 'Something Went Wrong!!';
    const errContent = 'Please Try Again or Check Your Internet (if any issue please contact us from Contact Us Page)';
    const serializedData = searchParams.get('questionListReq');
    const userName = searchParams.get('username');
    const [alertMessage, setAlertMessage] = useState();
    const [totalPageNum, setTotalPageNum] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const questionListReq = JSON.parse(decodeURIComponent(serializedData));
    const navigate = useNavigate();
    const [data,setData] = useState();
    const [loading,setLoading] = useState(true);

    const handlePageChange = (newPage) =>{
        setCurrentPage(newPage);
        getQuestionListByDifficulty(1,15,questionListReq,userName)
          .then(res=>{
              setData(res);
              setLoading(false);
          })
          .catch(err=>{
              setAlertMessage(errMssg);
          })
    }

    const setPageNum=(limit,totalQuestionNum)=>{
        let num = Math.ceil(totalQuestionNum/limit);
        if(num === 0){
          num = 1;
        }
        setTotalPageNum(num);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getQuestionListInfo(questionListReq,userName)
        .then((data)=>{
          setPageNum(15,data.totalQuestionNum);
          getQuestionListByDifficulty(1,15,questionListReq,userName)
          .then(res=>{
              setData(res);
              setLoading(false);
          })
          .catch(err=>{
              setAlertMessage(errMssg);
          })
        })
        .catch((err)=>{
          setAlertMessage(errMssg);
        })
    }, []);
  return (
    <div>
    <AlertMessage message={alertMessage} content={errContent} setMessage={setAlertMessage}/>
    <Nav/>
    <div className="box-container">
      <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                {!userName && <th>Status</th>}
                <th>Name</th>
                <th>Topic Tags</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            {!loading && <tbody>
              {data &&
                data.map((obj, index) => (
                  <tr key={index}>
                    {!userName && <td>
                      <span
                        style={{
                          color:
                            obj.status === 'SOLVED'
                              ? 'green'
                              : obj.status === 'PENDING'
                              ? '#9d9d48'
                              : 'transparent',
                        }}
                      >
                        {obj.status || '--'}
                      </span>
                    </td>}
                    <td
                      className='question-name'
                      onClick={() => {
                        navigate(`/question?name=${obj.name}`);
                      }}
                    >
                      {obj.name}
                    </td>
                    <td>
                      {obj.topicTags ? obj.topicTags.join(' | ') : '--'}
                    </td>
                    <td
                      style={{
                        color:
                          obj.difficulty === 'EASY'
                            ? 'green'
                            : obj.difficulty === 'MEDIUM'
                            ? '#9d9d48'
                            : obj.difficulty === 'HARD'
                            ? 'red'
                            : 'black',
                      }}
                    >
                      {obj.difficulty || '--'}
                    </td>
                  </tr>
                ))}
            </tbody>}
          </Table>
          {loading && <div style={{display:'flex', justifyContent:'center', alignItems :'center'}}>
                  <ReactLoading type={'bubbles'} color={'grey'} height={40} width={80}/>
              </div>}
        </Container>
          <DynamicPagination
              total={totalPageNum}
              selected={currentPage}
              handlePageChange={handlePageChange}
          />
        </div>
    </div>
    </div>
  );
};

export default QuestionList;
