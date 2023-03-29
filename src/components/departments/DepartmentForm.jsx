import { useState } from "react";
import './DepartmentForm.css';

const URL = 'https://vef2-2023-v3-production.up.railway.app/departments';

export function DepartmentForm() {
  const [state, setState] = useState('empty');
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function createDepartment(name, description) {
    setState('loading');
    try {
      const body = {
        name,
        description,
      }
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });
      console.log('Response', response);
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          const responseJson = await response.json();
          setState('error');
          setErrors(responseJson.errors);
        }
      } else {
        // const json = await response.json();
        console.log('Response', response);
        setState('data');
      }
    } catch (e) {
      setState('error');
      console.log('response:', e);
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setErrors([]);

    if (name.length <= 0) {
      setState('error');
      setErrors(errors => [...errors, 'Nafn má ekki vera tómt']);
    }
    if (description.length <= 0) {
      setState('error');
      setErrors(errors => [...errors, 'Lýsing má ekki vera tóm']);
    }
    if (name.length > 0 && description.length > 0) {
      setState('data');
      createDepartment(name, description);
    }
  }

  const onInputChange = (e) => {
    setName(e.target.value);
  }

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  return (
    <>
    <div className="departmentForm">
      <form onSubmit={onSubmitHandler}>
        <legend>Ný deild</legend>
        <div className="formInput">
          <input placeholder="Nafn" id="name" type="text" value={name} onChange={onInputChange}/>
          <textarea placeholder="Lýsing" type="text" value={description} onChange={onDescriptionChange}></textarea>
        </div>
        <button>Búa til nýja deild</button>
      </form>

      <div className="states">
      {state === 'error' && (
        <>
          <h4>Villa við að búa til deild</h4>
          <p>Villur:</p>
          <ul>
            {errors.map((error, i) => {
              return (<li key={i}>{error}</li>)
            })}
          </ul>
        </>
      )}
      </div>

      {state === 'loading' && (<p>Bý til deild...</p>)}
      {state === 'data' && (<p>Bjó til deild</p>)}
    </div>
    </>
  )
}

export default DepartmentForm;
