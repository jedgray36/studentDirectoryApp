import React, { FC, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';

interface ModalProps {
    open: boolean;
}


const DeleteModal: FC<ModalProps> = ({open}) => {


return (
<>
<Modal
show={open}
size="lg"
centered>
<ModalHeader>Delete Item</ModalHeader>
<ModalBody>
    <span>Deleting Item...</span>
<div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
  </div>
</div>
</ModalBody>
</Modal>
</>
);

}


export default DeleteModal;