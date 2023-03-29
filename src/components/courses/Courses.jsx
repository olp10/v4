import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { CourseForm } from './CourseForm';
import './Courses.css';

export function Courses() {
  const [state, setState] = useState('empty');
  const [courses, setCourses] = useState([]);
  const { slug } = useParams();

  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchData() {
      await fetchCourses(slug);
    }
    fetchData();
  }, [slug]);

  async function fetchCourses(departmentSlug) {
    setState('loading');
    try {
      const response = await fetch(`${URL}/departments/${departmentSlug}/courses`);
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

        <section className="coursesList">

            {state === 'empty' && (<p>engar deildir</p>)}
            {state === 'error' && (<p>villa við að sækja deildir</p>)}
            {state === 'loading' && (<p>Sæki deildir...</p>)}
            <div className="tableContainer">
            <h2>Áfangar í boði</h2>
              <table>
                <thead>
                  <tr>
                    <td>Númer</td>
                    <td>Heiti</td>
                    <td>Einingar</td>
                    <td>Kennslumisseri</td>
                    <td>Námsstig</td>
                  </tr>
                </thead>

                <tbody>
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
                </tbody>
              </table>
            </div>
              <CourseForm />
        </section>
    </>
  );
}

export default Courses;
