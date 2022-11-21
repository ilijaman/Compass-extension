import { useState } from "react"

function App() {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [admin, setAdmin] = useState(false)

const handleSubmit = (event) => {
  event.preventDefault()
  const user = JSON.stringify({
    "username": username,
    "password": password,
    "checked": admin
  });

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: user
  };
  
  fetch("http://localhost:5000/api/register/", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
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

export default App;
