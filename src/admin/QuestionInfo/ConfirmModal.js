import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example(props) {
    const {message, show, onChangeConfirmation, onContinueModal, cnfmBtnVariant} = props;
  return (
    <>
      <Modal
        show={show}
        onHide={()=>{onChangeConfirmation(false)}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{onChangeConfirmation(false)}}>
            Close
          </Button>
          <Button variant={cnfmBtnVariant} onClick={()=>{onContinueModal()}}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;