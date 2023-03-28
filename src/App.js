import './App.css';
import { Departments } from './components/departments/Departments';
import { DepartmentForm } from './components/departments/DepartmentForm';
import { Department } from './components/departments/Department';
import { Route, Router, Routes } from 'react-router';
import { RouterProvider, BrowserRouter, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { Layout } from './components/Layout/Layout';

function App() {
  return Layout();
}

export default App;


