import LogoutButton from './LogoutButton';
import { Link } from "react-router-dom"

function Nav({ user, setUser }) {
  return (
    <div className="fixed-nav-bar">
      <div className="nav-logo">
        <img src = "/logo.png" alt="logo"/>
      </div>
      {user.account_type === 'Admin' && <Link to="/">Home</Link>}
      <div className="nav-btn">
      {user ? (
        <LogoutButton setUser={setUser} />
      ) : (<Link to="/login">Login</Link>
      )}
      </div>

    </div>
  )
}

export default Nav;