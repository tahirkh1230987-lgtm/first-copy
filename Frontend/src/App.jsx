import React from 'react'
import { SignUp } from './Pages/SignUp'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Users from './Pages/Users'
import Services from './Pages/Services'
import Layout from './Component/Layout'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Services" element={<Services />} />
        </Route>
      </Routes>

      <Toaster position="top-right" />
    </div>
  )
}

export default App