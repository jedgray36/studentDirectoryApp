import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal';


interface Student {
  _id: string,
  firstName: string,
  lastName: string,
  age: string,
  subjects: string[]
  id: string,
}


function App() {

const [students, setStudents] = useState<Student[]>([]);
const [firstName, setFirstName] = useState<string>();
const [lastName, setLastName] = useState<string>();
const [age, setAge] = useState<string>();

const [subjects, setSubjects] = useState<string[]>([]);
const [newSubject, setNewSubject] = useState('');
const [showActionModal, setShowActionModal] = useState(false);

const [show, setShow] = useState(false);
const [studentFlag, setStudentFlag] = useState<boolean>(true);
const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

useEffect(() => {
  getStudents();
}, [refreshFlag])

const getStudents = async () => {
  setRefreshFlag(false)
  try {
    const studentData = await axios.get('http://localhost:3001/api/student');
    setStudents(studentData.data)
    setStudentFlag(false);
  }
catch(e) {
  console.log(e)
}
}

const handleSubmit = (event: any) => {
  setSubjects(prevSubjects => [...prevSubjects, newSubject]);
  setNewSubject('');
};


const addStudents = async () => {
  try {
    const newStudent = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      subjects: subjects
    }
    await axios.post('http://localhost:3001/api/student',newStudent)
    setRefreshFlag(true);
  } catch(e) {
    console.log(e);
  }
}

const updateStudent = async (student: Student) => {
  try {
    const updateStudent = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      subjects: subjects
    }
    await axios.put('http://localhost:3001/api/student',updateStudent)
    setRefreshFlag(true);
  } catch(e) {
    console.log(e);
  }
}


const deleteStudent = async (id: string) => { 
  try {
    
    await axios.delete(`http://localhost:3001/api/student/${id}`);
    const updatedStduents = students.filter((student) => student.id !== id);
    setStudents(updatedStduents);
    setShowActionModal(true);
    setTimeout(() => {
      setRefreshFlag(true);
      setShowActionModal(false);
    }, 2000)

  }
catch(e) {
  setShowActionModal(false);
  console.log(e)
}
}

const getStudent = async (id: any) => {
  try {
    await axios.delete(`http://localhost:3001/api/student/${id}`);
    setRefreshFlag(true);
  }
catch(e) {
  console.log(e)
}
}

const setDelete = () => {
  setDeleteFlag(!deleteFlag);
}


const handleSubDelete = (id: any) => {
  const updatedSubjects = [...subjects];
  updatedSubjects.splice(id, 1);
  setSubjects(updatedSubjects);
}

const handleInputChange = (index: any, value: string) => {
  const updatedSubjects = [...subjects];
  updatedSubjects[index] = value;
  setSubjects(updatedSubjects);
};

const handleNewSubjectChange = (e: any) => {
  setNewSubject(e.target.value);
};


const populateModal = (studentItem: Student) => {
setFirstName(studentItem.firstName);
setLastName(studentItem.lastName);
setAge(studentItem.age);
setSubjects(studentItem.subjects);
}

const closeModal = () => {
  setFirstName("");
  setLastName("");
  setAge(undefined);
  setSubjects([]);
}

  return (
    <div className="App">
      <div className='header'>
      <div className='title'>Student Directory <PersonIcon fontSize='large'/></div>
      </div>
      <div className='sub'>
      <h3 className='students'>Students List Admin</h3>

      <button onClick={() => setShow(true)} className='add'>
        Add Student <AddIcon/>
        </button> 
      <button onClick={() => setDelete()} className='delete'>
        {!deleteFlag ? <>Delete Students <DeleteIcon/></> : <>Edit Students <EditIcon/></>}
        </button>

      </div>
      <DeleteModal open={showActionModal}/>
      {studentFlag ? <div>No Student Data</div> : ""}
      <div className='containerStudent'>
        {students.map((student: Student) => 
        <div className='student' key={student.id}>
            <div className='edit'>{student.firstName + " " + student.lastName}
            <button className='dataButton'>
              {!deleteFlag 
              ? <EditIcon onClick={() => {setShow(true); populateModal(student)}} /> 
              : <DeleteIcon onClick={() => deleteStudent(student._id)}/>}
              </button></div>
            <div>Age: {student.age}</div>
            <div>Subjects: {student.subjects.map((subject: string, index: any) => (
              <span key={index}>{subject + ",  "}</span>
            ))}</div>
            </div>
        )}
      </div>
      <Modal
            show={show}
            size="lg"
            centered
          >
            <Modal.Header>
              <Modal.Title>
               Add New Student
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='input'>
              <label>First Name</label>
              <input value={firstName} onChange={(e: any) => setFirstName(e.target.value)}></input>
              <label>Last Name</label>
              <input value={lastName} onChange={(e: any) => setLastName(e.target.value)}></input>
              </div>
              <div className='input'>
              <label>Age</label>
              <input value={age} onChange={(e: any) => setAge(e.target.value)} inputMode='numeric'></input>
              </div>

              <div className='input'>
              <label>Subjects</label>

              <div className='input'>
              {subjects.map((subject, index) => (
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
            <Button variant="outlined" onClick={() => {setShow(false); addStudents();}}>Submit</Button>
              <Button variant="error" onClick={() => {setShow(false); closeModal();}}>Close</Button>
            </Modal.Footer>
          </Modal>
    </div>
  );
}

export default App;
