import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./Comments.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
  delQuestionComment,
  getQuestionComments,
  getQuestionInfo,
  postQuestionComment,
} from "../services/question-service";
import { getUser } from "../auth";
import DynamicPagination from "../components/DynamicPagination";
import AlertMessage from "../components/AlertMessage";
import { toast } from "react-toastify";
import DeleteIcon from "../assets/images/del-icon.png";
import Loading from "../components/Loading";

const Comments = (props) => {
  const { questionName, isLogin } = props;
  const [comment, setComment] = useState();
  const [questionComments, setQuestionComments] = useState();
  const [user, setUser] = useState(getUser());
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState();
  const [alertDescription, setAlertDescription] = useState();
  const [loadingContent, setLoadingContent] = useState(null);

  const handlePostComment = () => {
    if (comment === undefined) {
      toast.error("comment must not be null");
      return;
    }
    if (
      questionComments.length > 0 &&
      questionComments[0].userName === user.userName
    ) {
      setAlertMessage("Comment Not Post");
      setAlertDescription("Only one comment allowed with one userName");
      return;
    }
    const userComment = { comment: comment, questionName: questionName };
    setLoadingContent(" ");
    postQuestionComment(userComment)
      .then((data) => {
        toast.success(data.message);
        setComment("");
        setLoadingContent(null);
      })
      .catch((err) => {
        setAlertMessage("Something Went Wrong");
        setLoadingContent(null);
      });
  };

  const setPageNum = (limit, totalCommentNum) => {
    let num = Math.ceil(totalCommentNum / limit);
    if (num === 0) {
      num = 1;
    }
    setTotalPageNum(num);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const removeComment = (comment_id) => {
    const updatedData = questionComments.filter(
      (item) => item.comment_id !== comment_id
    );
    setQuestionComments(updatedData);
  };

  const handleDelComment = (commentId) => {
    try {
        setLoadingContent(" ");
      delQuestionComment(commentId)
        .then((data) => {
          removeComment(commentId);
          toast.success(data.message);
          setLoadingContent(null);
        })
        .catch((err) => {
          toast.error("Comment Not Deleted");
          setLoadingContent(null);
        });
    } catch (err) {
      setAlertMessage("Something Went Wrong");
      setLoadingContent(null);
    }
  };

  useEffect(() => {
    try {
      getQuestionInfo(questionName)
        .then((data) => {
          setPageNum(10, data.totalComments);
          getQuestionComments(questionName, 1, 10)
            .then((data) => {
              setQuestionComments(data);
            })
            .catch((err) => {
              setAlertMessage("Something Went Wrong");
            });
        })
        .catch((err) => {
          setAlertMessage("Something Went Wrong");
        });
    } catch (err) {
      setAlertMessage("Something Went Wrong");
    }
  }, []);

  useEffect(() => {
    setUser(getUser());
  }, [isLogin]);
  return (
    <div className="comments-container h-full">
      <div className="relative">
        <AlertMessage
          message={alertMessage}
          content={alertDescription}
          setMessage={setAlertMessage}
        />
        {loadingContent && <Loading content={loadingContent} />}
        <div className="form-container">
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          <Button
            disabled={!isLogin}
            variant="primary"
            type="submit"
            className="submit-button"
            onClick={() => {
              handlePostComment();
            }}
          >
            POST
          </Button>
        </div>
        {questionComments &&
          questionComments.map((value, index) => (
            <div key={index} className="user-comments overflow-auto">
              <Card
                style={{ marginBottom: "10px", margin: "10px 20px 10px 20px" }}
              >
                <Card.Header
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="pt-1">{value.userName}</div>
                  {user && user.userName === value.userName && (
                    <div
                      class="del-btn"
                      onClick={() => {
                        handleDelComment(value.comment_id);
                      }}
                    >
                      <img src={DeleteIcon} alt="Delete" />
                    </div>
                  )}
                </Card.Header>
                <Card.Body>
                  <blockquote className="mb-0">
                    <p className="whitespace-pre-wrap"> {value.comment} </p>
                  </blockquote>
                </Card.Body>
              </Card>
            </div>
          ))}
        <div style={{ alignSelf: "center" }}>
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

export default Comments;
