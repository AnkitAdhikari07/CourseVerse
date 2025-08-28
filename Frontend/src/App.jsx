import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { Toaster } from 'react-hot-toast';
import Courses from './Components/Courses'
import Buy from './Components/Buy'
import Purchases from './Components/Purchases'
import AdminSingup from './admin/AdminSingup'
import AdminLogin from './admin/AdminLogin'
import Dashboard from './admin/Dashboard'
import CourseCreate from './admin/CourseCreate'
import UpdateCourse from './admin/UpdateCourse'
import OurCourses from './admin/OurCourses'


function App() {

  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>


        {/* Other Routes */}
        <Route path='/courses' element={<Courses />}/>
        <Route path='/buy/:courseId' element={<Buy />}/>
        <Route path='/purchases' element={<Purchases />} />

        {/* Admin Routes */}
        <Route path='/admin/signup' element={<AdminSingup />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/create-course' element={<CourseCreate/>} />
        <Route path='/admin/update-course/:id' element={<UpdateCourse />} />
        <Route path='/admin/our-courses' element={<OurCourses />} />

      </Routes>
      <Toaster />
    </div>
  )
}

export default App