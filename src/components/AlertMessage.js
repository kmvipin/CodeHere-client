import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

function AlertMessage(props) {
    const {message,content, setMessage} = props;

  return (
    <>
      <Modal show={message} onHide={()=>{setMessage(null)}}>
        <Alert  style={{marginBottom : '0rem'}} variant="danger" onClose={()=>{setMessage(null)}} dismissible>
        <Alert.Heading>{message}</Alert.Heading>
          <p>
            {content}
          </p>
        </Alert>
      </Modal>
    </>
  );
}

export default AlertMessage;