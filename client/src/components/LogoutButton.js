import { useNavigate } from "react-router-dom"

const LogoutButton = ({ setUser }) => {
  const navigate = useNavigate()
    const handleClick = async () => {
      const res = await fetch('/api/logout/', {
        method: 'POST'
      })
      const data = await res.json()
      setUser(null)
      navigate("/login")
    }
  
    return (
      <div className="logoutBtn">
        <button onClick={handleClick}>Logout</button>
      </div>
    )
  }
  
  export default LogoutButton