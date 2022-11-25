import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import '../signin.css'
import { Form, Button } from "react-bootstrap"

const initialState = { username: "", password: "" }

const Login = ({ setUser }) => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(false)
  const [admin, setAdmin] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = JSON.stringify({
      "username": username,
      "password": password,
      "checked": admin
  });

  try {
    const res = await fetch("/api/login/", {
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
        navigate(`/compassbuddy/${userData.user.id}`)
      }
      }catch (error) {
  }
}

  return (
    <div className="login-page">
      <div>
      <Form className="form-signin" onSubmit={handleSubmit}>
        <Form.Control
            className="form-signin input"
            onChange= {e => setUsername(e.target.value)} value={username}
            name="username"
            id="login-username"
            type="text"
            placeholder="username"
        />

        <Form.Control
            className="form-signin input"
            onChange={e => setPassword(e.target.value)} value={password}
            name="password"
            id="login-password"
            type="password"
            placeholder="password"
        />
      <Form.Group>
        <Form.Check
            type="checkbox" 
            id="isadmin" 
            onChange={() => setAdmin(!admin)} 
            value={admin}
        />
        <Form.Label htmlFor="isadmin">is admin?</Form.Label>
        </Form.Group>
        <div id="login-btn">
        <Button variant="primary" type="submit">Login</Button>
        </div>
    </Form>
    </div>
    </div>
  )
}

export default Login;