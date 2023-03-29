import { useState } from 'react';
import { useParams } from 'react-router';
import './CourseForm.css';

export function CourseForm() {
  const [state, setState] = useState('empty');
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [semester, setSemester] = useState('Vor');
  const [degree, setDegree] = useState('Grunnnám');
  const [credits, setCredits] = useState('');
  const [linkToSyllabus] = useState('');

  const { slug } = useParams();
  const department = slug;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setErrors([]);

    if (name.length <= 0) {
      setState('error');
      setErrors(errors => [...errors, 'Nafn má ekki vera tómt']);
    }
    if (credits.length <= 0) {
      setState('error');
      setErrors(errors => [...errors, 'Kredit má ekki vera tómt']);
    }
    if (number.length <= 0) {
      setState('error');
      setErrors(errors => [...errors, 'Númer má ekki vera tómt']);
    }

    if (name.length > 0 && credits.length > 0 && number.length > 0) {
      setState('success');
      createCourse(name, number, semester, degree, credits, linkToSyllabus, department);

    }
  }

  const onNameChange = (e) => {
    setName(e.target.value);
  }

  const onNumberChange = (e) => {
    setNumber(e.target.value);
  }

  const onCreditsChange = (e) => {
    setCredits(e.target.value);
  }

  const onDegreeChange = (e) => {
    setDegree(e.target.value);
    console.log(degree);
  }

  const onSemesterChange = (e) => {
    setSemester(e.target.value);
  }

  async function createCourse(name, number, semester, degree, credits, linkToSyllabus) {
    setState('loading');
    try {
      const body = {
        name,
        number,
        semester,
        degree,
        credits: parseFloat(credits),
        linkToSyllabus,
        department,
      }
      console.log(body);
      const response = await fetch(`http://localhost:4000/departments/${slug}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });
      console.log(response);
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          const responseJson = await response.json();
          setState('error');
          setErrors(responseJson.errors);
        }
      } else {
        // const json = await response.json();
        console.log('Response', response);
        setState('success');
      }
    }

     catch (e) {
      setState('error');
      console.log('response:', e);
     }
  }

  return (
    <>
    <div className='formContainer'>
      <legend>Bæta við áfanga</legend>
      <form onSubmit={onSubmitHandler} className="newCourse">
        <input type="text" name="name" id="name" placeholder='Heiti' value={name} onChange={onNameChange}></input>
        <input type="text" name="number" id="number" placeholder="Númer áfanga" value={number} onChange={onNumberChange}></input>
        <input type="number" step=".5" name="credits" id="credits" placeholder="Fjöldi eininga" value={credits} onChange={onCreditsChange}></input>
        <select value={degree} onChange={onDegreeChange} onLoad={onDegreeChange}>
          <option disabled="true">Námsstig</option>
          <option>Grunnnám</option>
          <option>Framhaldsnám</option>
          <option>Grunnnám / Framhaldsnám</option>
        </select>
        <select value={semester} onChange={onSemesterChange}>
          <option disabled="true">Kennslumisseri</option>
          <option>Vor</option>
          <option>Sumar</option>
          <option>Haust</option>
          <option>Heilsárs</option>
        </select>
        <button>Bæta við áfanga</button>
      </form>

      <div className='states'>
        {state === 'success' && (
          <p>Bjó til áfanga</p>
        )}
        {state === 'error' && (
          <>
            <h4><u>Villa við að búa til deild</u></h4>
            <p>Villur:</p>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
    </>
  )
}



