import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Courses from "../courses/Courses";
import Department from "../departments/Department";
import Departments from "../departments/Departments";
import './Layout.css';


export function Layout() {
  return (
    <>
      <header>
        <h1>Kennsluskráin!</h1>
      </header>

      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to='/departments' />} />
            <Route path="/departments/:slug" element={<Department />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:slug/courses" element={<Courses />} />
          </Routes>
        </BrowserRouter>
      </main>

      <footer>
        <p>Ólafur Pálsson &copy;2023</p>
      </footer>
    </>
  );
}

export default Layout;
