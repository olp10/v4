import { NavLink } from 'react-router-dom';
import './DepartmentButtons.css';

export function DepartmentButtons( {slug} ) {
  console.log(slug);
  return (
    <div className="buttonContainer">
      <button><NavLink to={`/departments/${slug}/courses`}>Sjá áfanga</NavLink></button>
      <button>Eyða deild</button>
    </div>
  )
}

export default DepartmentButtons;
