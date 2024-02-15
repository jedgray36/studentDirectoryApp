import React, { FC, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';

interface ModalProps {
    open: boolean;
    type: "editing" | "deleting" | "adding"
}


const ActionModal: FC<ModalProps> = ({open, type}) => {


return (
<>
<Modal
show={open}
size="lg"
centered>
<ModalHeader>Performing Update</ModalHeader>
<ModalBody>
    <span>{type} Item...</span>
<div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
  </div>
</div>
</ModalBody>
</Modal>
</>
);

}


export default ActionModal;