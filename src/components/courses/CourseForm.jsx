import { useState } from 'react';
import './CourseForm.css';

export function CourseForm() {
  const [state, setState] = useState('empty');
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [degree, setDegree] = useState('');
  const [credits, setCredits] = useState('');
  const [linkToSyllabus, setLinkToSyllabus] = useState('');


  const onSubmitHandler = (e) => {
    e.preventDefault();
  }


  return (
    <form onSubmit={onSubmitHandler} className="newCourse">
      <input type="text" name="name" id="name" placeholder='Heiti'></input>
      <input type="text" name="number" id="number" placeholder="Númer áfanga"></input>
      <input type="number" name="credits" id="credits" placeholder="Fjöldi eininga"></input>
      <select>
        <option value="1" disabled="true">Námsstig</option>
        <option>Grunnnám</option>
        <option>Framhaldsnám</option>
        <option>Grunnnám / Framhaldsnám</option>
      </select>
      <select>
        <option value="1" disabled="true">Kennslumisseri</option>
        <option>Vor</option>
        <option>Sumar</option>
        <option>Haust</option>
        <option>Heilsárs</option>
      </select>
      <button>Bæta við áfanga</button>
    </form>
  )


}



