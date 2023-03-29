import { useEffect, useState } from "react";
import { useParams } from "react-router";
import './Department.css';
import DepartmentButtons from "./DepartmentButtons";

const URL = 'http://localhost:4000/departments/';

export function Department() {
  const [state, setState] = useState('loading');
  const [department, setDepartment] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    async function fetchData() {
      await fetchDepartment(slug);
    }
    fetchData();
  }, [slug]);


  async function fetchDepartment(slugToFetch) {
    setState('loading');
    try {

      const response = await fetch(URL + slugToFetch);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const json = await response.json();
      console.log(json);
      setDepartment(json);
      setState('data');
    } catch (e) {
      setState('error');
      console.log(e);
    }
  }

  return (
    <section className='departmentInfo'>
      {state === 'data' && (
        <>
          <h2>{department.name}</h2>
          <h3>{department.description}</h3>
          <DepartmentButtons state={state} slug={slug} setState={setState} />
        </>
      )}
      {state === 'empty' && (
        <p>Engar deildir</p>
      )}
      {state === 'error' && (
        <p>Villa við að sækja deildir</p>
      )}
      {state === 'loading' && (
        <p>Sæki deildir...</p>
      )}
      {state === 'deleted' && (
        <p>Deild eytt</p>
      )}


    </section>

    /* TODO: Implementa update form fyrir deild
      <DepartmentUpdate name={department.name} /> // Component fyrir form til að uppfæra deild?
    */
  )
}

export default Department;
