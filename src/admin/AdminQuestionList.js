import React from 'react';
import './AdminQuestionList.css';
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
import { Link } from 'react-router-dom';
import ConfirmModal from './QuestionInfo/ConfirmModal';
import { deleteQuestion } from '../services/admin/admin-service';
import { toast } from 'react-toastify';

const QuestionList = () => {

    const location = useLocation();
    const errMssg = 'Something Went Wrong!!';
    const errContent = 'Please Try Again or Check Your Internet (if any issue please contact us from Contact Us Page)';
    const searchParams = new URLSearchParams(location.search);
    const serializedData = searchParams.get('questionListReq');
    const [alertMessage, setAlertMessage] = useState();
    const [totalPageNum, setTotalPageNum] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const questionListReq = JSON.parse(decodeURIComponent(serializedData));
    const navigate = useNavigate();
    const [data,setData] = useState();
    const [loading,setLoading] = useState(true);
    const [toDeleteQuestionName, setToDeleteQuestionName] = useState();

    const handlePageChange = (newPage) =>{
        setCurrentPage(newPage);
    }

    const setPageNum=(limit,totalQuestionNum)=>{
        let num = Math.ceil(totalQuestionNum/limit);
        if(num === 0){
          num = 1;
        }
        setTotalPageNum(num);
    }

    const handleDelQuestion=(name)=>{
        setToDeleteQuestionName(null);
        try{
            deleteQuestion(name)
            .then((data)=>{
                if(data.success === true){
                    toast.success("Question Delete SuccssFully");
                }
                else{
                    toast.error(data.message);
                }
            })
            .catch(err=>{
                toast.error("see console");
                console.error(err);
            })
        }
        catch(err){
            setAlertMessage("Something Went Wrong");
        }
    }

    const handleConfirmSubmission=()=>{
        setShowConfirmation(false);
        handleDelQuestion(toDeleteQuestionName);
    }

    const handleQuestionUpdate=(questionName)=>{
        navigate(`/admin2023/update-question?question-name=${questionName}`);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getQuestionListInfo(questionListReq,null)
        .then((data)=>{
          setPageNum(20,data.totalQuestionNum);
          getQuestionListByDifficulty(1,5,questionListReq,null)
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
    <ConfirmModal message={toDeleteQuestionName} show={showConfirmation} 
    onChangeConfirmation={setShowConfirmation} onContinueModal={handleConfirmSubmission} cnfmBtnVariant="danger"/>
    <Nav/>
    <div className="box-container">
      <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
        <Container>
          <Table striped bordered hover className='table'>
            <thead>
              <tr>
                <th>Status</th>
                <th>Update</th>
                <th>Topic Tags</th>
                <th>Difficulty</th>
                <th>Delete</th>
              </tr>
            </thead>
            {!loading && <tbody>
              {data &&
                data.map((obj, index) => (
                  <tr key={index}>
                    <td>
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
                    </td>
                    <td
                      className='question-name'
                      onClick={() => {
                        handleQuestionUpdate(obj.name);
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
                    <td>
                        <Link onClick={()=>{
                            setToDeleteQuestionName(obj.name);
                            setShowConfirmation(true);
                        }}>Del</Link>
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
        <Footer/>
    </div>
    </div>
  );
};

export default QuestionList;
