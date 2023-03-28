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

  if (state === 'error') {
    return (
      <p>Villa við að sækja deild</p>
    )
  }

  if (state === 'loading') {
    return (
      <p>Sæki deild...</p>
    )
  }

  console.log(slug);
  return (
    <section>
      <h2>{department.description}</h2>
      <DepartmentButtons slug={slug}/>
    </section>

    /* TODO: Implementa update form fyrir deild
      <DepartmentUpdate name={department.name} /> // Component fyrir form til að uppfæra deild?
    */
  )
}

export default Department;
