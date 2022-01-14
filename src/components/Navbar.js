import { Link } from 'react-router-dom';
import { useLogout } from './hooks/useLogout';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import styles from './Navbar.module.css';

const Navbar = () => {
  const { error, isPending, logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <nav className={styles.navbar}>
      <h3>Derek's Money</h3>
      <ul>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              Hello, <span>{user.displayName}!</span>
            </li>
            <li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
