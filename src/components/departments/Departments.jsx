import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import DepartmentForm from './DepartmentForm';
import './Departments.css';

const URL = 'http://localhost:4000/departments';

export function Departments( { title }) {
    const [state, setState] = useState('empty');
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await fetchDepartments();
        }
        fetchData();
    }, []);

    async function fetchDepartments() {
        setState('loading');
        try {
            const response = await fetch(URL);
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            const json = await response.json();
            setDepartments(json);
            setState('data');
        } catch (e) {
            setState('error');
            console.log(e);
        }
    }

    return (
      <>
        <div className="departments">
          <section className="departmentList">
              <h2>{title}</h2>
              {state === 'empty' && (<p>engar deildir</p>)}
              {state === 'error' && (<p>villa við að sækja deildir</p>)}
              {state === 'loading' && (<p>Sæki deildir...</p>)}
              <ul>
                  {state === 'data' && departments.map((department, i) => {
                    return (
                      <li key={department.slug}><NavLink to={`/departments/${department.slug}`}>{department.name}</NavLink></li>
                    )
                  })}
              </ul>
              <button onClick={() => fetchDepartments}>Sækja deildir</button>
          </section>

          <DepartmentForm />
        </div>
      </>
    );
}

export default Departments;
