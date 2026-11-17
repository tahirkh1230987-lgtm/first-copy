import React from 'react'
import { SignUp } from './Pages/SignUp'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>

      <Toaster position="top-right" />
    </div>
  )
}

export default App