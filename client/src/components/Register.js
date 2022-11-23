import { useState } from "react"
import { Navigate } from "react-router"

const Register = ( setUser) => {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [admin, setAdmin] = useState(false)

const handleSubmit = async (event) => {
  event.preventDefault()
  alert('hello')
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
      console.log(user.username)
      setUser(userData)
     
      // if (admin === true) {
      //   // Navigate('/<adminhome>/')
      // } else {
      //   // Navigate('/<adminhome>/')
      // }
      }catch (error) {
  }
}

return (
  <div className="App">
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">username
      <input type="text" id="username" onChange={e => setUsername(e.target.value)} value={username}/>
      </label>
      <label htmlFor="password">password
          <input type="text" id="password" onChange={e => setPassword(e.target.value)} value={password}/>
      </label>
      <input type="checkbox" id="isadmin" onChange={() => setAdmin(!admin)} value={admin}></input>
      <label htmlFor="isadmin">is admin?</label>
      <input type="submit"/>
    </form>
  </div>
  );
}

export default Register;