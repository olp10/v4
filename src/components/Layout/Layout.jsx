import { BrowserRouter, Route, Routes } from "react-router-dom";
import Courses from "../courses/Courses";
import Department from "../departments/Department";
import DepartmentForm from "../departments/DepartmentForm";
import Departments from "../departments/Departments";


export function Layout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Departments />} />
        <Route path="/departments/:slug" element={<Department />} />
        <Route path="/departments" element={<DepartmentForm />} />
        <Route path="/departments/:slug/courses" element={<Courses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Layout;
