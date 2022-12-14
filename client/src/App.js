import { useState, useEffect } from "react"
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from "./components/Register"
import Login from "./components/Login"
import AdminHome from "./components/AdminHome"
import StudentProfile from "./components/StudentProfile";
import StudentHome from "./components/StudentHome";
import Nav from "./components/Nav";

const PrivateRoutes = ({ user }) => {
  console.log('Admin Route -', user)
  if (user === null) {
    return <p>Loading...</p>
  }
  return user.account_type === 'Admin' ? <Outlet /> : <Navigate to="/login" />
}

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)


  useEffect(() => {
    const getLoggedInUser = async () => {
      const res = await fetch("/api/verify/")
      const data = await res.json()
      if (res.status === 200) {
        setUser(data.user)
      }
    }
    getLoggedInUser()
  }, [])

  return (
    <div className="App">
      <div className="app-container">
      {user && <Nav user={user} setUser={setUser} />}
      <Routes>        
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/compassbuddy/:studentID/" element={<StudentHome user={user}/>} />
        
      <Route path="/" element={<PrivateRoutes user={user} />}>
        <Route path="/" element={<AdminHome user={user}/> } />
        <Route path="/admin/:studentID/" element={<StudentProfile user={user}/>} />
      </Route>

      </Routes> 
      
     
      </div>
    </div>
  );
}

export default App;
