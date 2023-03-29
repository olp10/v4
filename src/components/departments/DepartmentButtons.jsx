import { NavLink } from 'react-router-dom';
import './DepartmentButtons.css';

export function DepartmentButtons( {slug, state, setState} ) {
  console.log(slug);

  async function deleteDepartment(slugToDelete) {
    try {
      const response = await fetch(`https://vef2-2023-v3-production.up.railway.app/departments/${slugToDelete}`, {
        method: 'DELETE'
      });
      if(!response.ok) {
        throw new Error('Something went wrong');
      }
      const json = await response.json();
      console.log(json);
    } catch (e) {
      console.log(e);
    }
  }

  const deleteDepartmentButtonHandle = (e) => {
    e.preventDefault();
    setState('deleted');
    deleteDepartment(slug);
  }

  return (
    <>
      <div className="buttonContainer">
        <NavLink to={`/departments/${slug}/courses`}><button>Sjá áfanga</button></NavLink>
        <button onClick={deleteDepartmentButtonHandle}>Eyða deild</button>
      </div>
    </>
  )
}

export default DepartmentButtons;
