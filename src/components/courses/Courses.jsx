import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import { CourseForm } from './CourseForm';
import './Courses.css';

export function Courses() {
  const [state, setState] = useState('empty');
  const [courses, setCourses] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    async function fetchData() {
      await fetchCourses(slug);
    }
    fetchData();
  }, []);

  async function fetchCourses(departmentSlug) {
    setState('loading');
    try {
      const response = await fetch(`http://localhost:4000/departments/${departmentSlug}/courses`);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const json = await response.json();
      setCourses(json);
      setState('data');
    } catch (e) {
      setState('error');
      console.log(e);
    }
  }

  return (
    <>
        <h2>Áfangar í boði</h2>
        <section className="coursesList">
            {state === 'empty' && (<p>engar deildir</p>)}
            {state === 'error' && (<p>villa við að sækja deildir</p>)}
            {state === 'loading' && (<p>Sæki deildir...</p>)}
            <div class="tableContainer">
              <table>
                <tr>
                  <td>Númer</td>
                  <td>Heiti</td>
                  <td>Einingar</td>
                  <td>Kennslumisseri</td>
                  <td>Námsstig</td>
                </tr>
                  {state === 'data' && courses.map((course, i) => {
                    return (
                      <tr key={course.id}>
                        <td>{course.number}</td>
                        <td>{course.name}</td>
                        <td>{course.credits}</td>
                        <td>{course.semester}</td>
                        <td>{course.degree}</td>
                      </tr>
                    )
                  })}
              </table>
            </div>
              <CourseForm />
        </section>
    </>
  );
}

export default Courses;
