import React, { FC, useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import { Student } from './App';

interface ModalProps {
    open: boolean;
    action: "editing" | "deleting" | "adding";
    student: Student
}


const DataModal: FC<ModalProps> = ({open, action, student}) => {


return (
<>
{/* <Modal
            show={open}
            size="lg"
            centered
          >
            <Modal.Header>
              <Modal.Title>
              {action === "editing" ? "Update Student" : "Add New Student" }
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='input'>
              <label>First Name</label>
              <input value={student.firstName} onChange={(e: any) => setFirstName(e.target.value)}></input>
              <label>Last Name</label>
              <input value={student.lastName} onChange={(e: any) => setLastName(e.target.value)}></input>
              </div>
              <div className='input'>
              <label>Age</label>
              <input value={student.age} onChange={(e: any) => setAge(e.target.value)} inputMode='numeric'></input>
              </div>

              <div className='input'>
              <label>Subjects</label>

              <div className='input'>
              {student.subjects.map((subject, index) => (
            <div className='subjects' key={index}>
              <div className='subjects'></div>
              <input className='input' value={subject} 
              onChange={(e) => handleInputChange(index, e.target.value)}/>
              <Button variant='none' onClick={() => handleSubDelete(index)}><DeleteIcon/></Button>
            </div>
                ))}
              <div className='subjects'>
              <input
                className='input'
                value={newSubject}
                onChange={handleNewSubjectChange}
              />
              <Button variant='none' onClick={handleSubmit}><AddIcon/></Button>
              </div>
              </div>
              </div>
              
            </Modal.Body>
            <Modal.Footer> 
            {action === "adding" && <Button variant="outlined" onClick={() => {setShow(false); addStudents();}}>Submit</Button>}
              {action === "editing" && <Button variant="outlined" onClick={() => {setShow(false); updateStudent(student?._id);}}>Update</Button>}
              
              <Button variant="error" onClick={() => {setShow(false); closeModal();}}>Close</Button>
            </Modal.Footer>
          </Modal> */}
</>
);

}


export default DataModal;