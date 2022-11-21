import { useState, useEffect } from "react"
import { Routes, Route, Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import Register from "./components/Register"
import Login from "./components/Login"


function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)


  useEffect(() => {
    const getLoggedInUser = async () => {
      const res = await fetch("/api/verify")
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
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
