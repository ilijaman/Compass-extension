import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, FormControl } from "react-bootstrap"
import '../signin.css'

const Register = ({ setUser }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = JSON.stringify({
      "username": username,
      "password": password,
      "checked": admin
  });

  try {
    const res = await fetch("/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: user
      }) 
      console.log(res.status)
      const userData = await res.json()
      console.log(userData.user.account_type)  
      setUser(userData.user)
      if (userData.user.account_type === 'Admin') {
        navigate('/')
      } else {
        navigate(`/compassbuddy/${userData.user.id}/`)
      }
      }catch (error) {
  }
}

return (
  <div className="App">
    <div className="login-page"> 
    <Form onSubmit={handleSubmit} className="form-signin">
      <Form.Control 
      type="text" 
      id="username" 
      placeholder="username"
      className="form-signin input" 
      onChange={e => setUsername(e.target.value)} value={username}
      />

      <Form.Control 
      type="password" 
      placeholder="password"
      id="password" 
      className="form-signin input"
      onChange={e => setPassword(e.target.value)} value={password}
      />
      <Form.Group>
        <Form.Label htmlFor="isadmin">Register as admin?</Form.Label> 
         <Form.Check 
          type="checkbox" 
          id="isadmin" 
          onChange={() => setAdmin(!admin)} 
          value={admin}
        />
      </Form.Group>
      <div id="login-btn">
        <Button variant="primary" type="submit">Register</Button>
      </div>
    </Form>
  </div>
  </div>
  );
}

export default Register;