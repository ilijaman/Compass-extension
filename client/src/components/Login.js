import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const initialState = { username: "", password: "" }

const Login = ({ setUser }) => {
  const [fields, setFields] = useState(initialState)
  const [error, setError] = useState(null)
  const [admin, setAdmin] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFields({
      ...fields,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch("/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    })
    const data = await res.json()
    if (res.status === 401) {
      setError(data)
    } else if (res.status === 200) {
      setError(null)
      setUser(data)
      console.log('user successfully logged in', data)
    //   navigate("/")
    }
    setFields(initialState)
  }

  return (
    <div className="login-page">
      <div className="form">
      <form onSubmit={handleSubmit}>
      {error && <p>{error.msg}</p>}
        <input
            onChange={handleChange}
            value={fields.username}
            name="username"
            id="login-username"
            type="text"
            placeholder="username"
        />

        <input
            onChange={handleChange}
            value={fields.password}
            name="password"
            id="login-password"
            type="Password"
            placeholder="password"
        />

        <input 
            type="checkbox" 
            id="isadmin" 
            onChange={() => setAdmin(!admin)} 
            value={admin}></input>

        <label htmlFor="isadmin">is admin?</label>

        <input type="submit" value="Login" />
    </form>
    </div>
    </div>
  )
}

export default Login;