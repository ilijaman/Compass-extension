import { useState, useEffect } from "react"
import { Routes, Route, Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from "./components/Register"
import Login from "./components/Login"
import AdminHome from "./components/AdminHome"


function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)


  useEffect(() => {
    const getLoggedInUser = async () => {
      const res = await fetch("/api/verify/")
      const data = await res.json()
      if (res.status === 200) {
        setUser(data)
      }
    }
    getLoggedInUser()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={<AdminHome /> } />
      </Routes>
    </div>
  );
}

export default App;
