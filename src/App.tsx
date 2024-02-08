import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


interface Student {
  firstName: string,
  lastName: string,
  age: number,
  subjects: string[]
}


function App() {

const [students, setStudents] = useState<Student[]>([]);
const api = "";

const getStudents = async () => {
const studentData = await axios.get(api);
setStudents(studentData.data)
}


const addStudents = () => {

}

const updateStudent = (id: any) => {

}


const deleteStudent = (id: any) => { 

}

const getStudent = (id: any) => {

}


  return (
    <div className="App">
      <h1>Student Directory</h1>

      <div className='students'>Students</div>
      <ul>
        {students.map((student) => 
          <li>
            <span>{student.firstName + " " + student.lastName}</span>
            <span>{student.age}</span>
            <span>{student.subjects}</span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
