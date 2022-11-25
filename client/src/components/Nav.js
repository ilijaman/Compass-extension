import '../navbar.css'
import LogoutButton from './LogoutButton';
import { Link } from "react-router-dom"

function Nav({ user, setUser }) {
  return (
    <div className="fixed-nav-bar">
      <ul>
        <li>{user.account_type === 'Admin' && <Link to="/">Home</Link>}</li>
        <li>{user ? (
        <LogoutButton setUser={setUser} />
      ) : (<Link to="/login">Login</Link>
      )}
      </li>
      </ul>
    </div>
  )
}

export default Nav;