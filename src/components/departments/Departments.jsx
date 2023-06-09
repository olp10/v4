import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import DepartmentForm from './DepartmentForm';
import './Departments.css';

const URL = process.env.REACT_APP_API_URL;

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
            const response = await fetch(`${URL}/departments`);
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
          <section className="departmentList">
              <h2>{title}</h2>
              {state === 'empty' && (<p>engar deildir</p>)}
              {state === 'error' && (<p>villa við að sækja deildir</p>)}
              {state === 'loading' && (<p>Sæki deildir...</p>)}
              <div className="tableContainer">
                <table>
                  <thead>
                    <tr>
                      <td>Deild</td>
                    </tr>
                  </thead>
                  <tbody>
                  {(state === 'data') && departments.map((department, i) => {
                    return (
                      <tr key={department.id}>
                        <td>
                          <NavLink to={`/departments/${department.slug}`}>{department.name}</NavLink>
                        </td>
                      </tr>
                    )
                  })}</tbody>
                  </table>
              </div>
          <DepartmentForm />
          </section>

      </>
    );
}

export default Departments;
