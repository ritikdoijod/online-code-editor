import React from 'react'
import { Alert, Button, Modal } from 'react-bootstrap';

const AlertModal = (props) => {
  return (
        <>
            <Modal show={props.show} onHide={() => props.closeAlert({type: "CLOSE"})}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Alert>
                        <Alert.Heading>{props.heading}</Alert.Heading>
                        
                    </Alert>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AlertModal;