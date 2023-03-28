import { useState } from "react";
import './DepartmentForm.css';

const URL = 'http://localhost:4000/departments';

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
        setState('success');
      }
    } catch (e) {
      setState('error');
      console.log('response:', e);
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    name.length <= 0 ? setErrors(['Nafn má ekki vera tómt']) : setErrors([]);
    description.length <= 0 ? setErrors(['Lýsing má ekki vera tóm']) : setErrors([]);

    if (name.length > 0 && description.length > 0) {
      setState('success');
      createDepartment(name, description);
    } else if (name.length <= 0) {
      setState('error');
      setErrors(['Nafn má ekki vera tómt']);
      console.log(errors);
    } else if (description.length <= 0) {
      setState('error');
      setErrors(['Lýsing má ekki vera tóm']);
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
          <p>villa við að búa til deild</p>
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
      {state === 'success' && (<p>Bjó til deild</p>)}
    </div>
    </>
  )
}

export default DepartmentForm;
