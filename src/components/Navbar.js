import { Link } from 'react-router-dom';
import { useLogout } from './hooks/useLogout';

// styles
import styles from './Navbar.module.css';

const Navbar = () => {
  const { error, isPending, logout } = useLogout();
  return (
    <nav className={styles.navbar}>
      <h3>Derek's Money</h3>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
