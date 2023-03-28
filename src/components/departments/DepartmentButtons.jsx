import { NavLink } from 'react-router-dom';
import './DepartmentButtons.css';

export function DepartmentButtons( {slug} ) {
  console.log(slug);
  return (
    <div className="buttonContainer">
      <NavLink to={`/departments/${slug}/courses`}><button>Sjá áfanga</button></NavLink>
      <button>Eyða deild</button>
    </div>
  )
}

export default DepartmentButtons;
