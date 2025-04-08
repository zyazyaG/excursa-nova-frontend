import { Link, useNavigate } from 'react-router-dom';
import styles from "./Header.module.css";
import Button from '../Button/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    
  return (
    <>
        <div className={styles.header}>
            <div className={styles.headerInner}>
                <div className={styles.logo}>
                    <Link to = "/">Logo</Link>
                </div>
                <nav className={styles.nav}>
                    {token && (
                        <>
                            <div className={styles.signed}>
                                <p>Hello, {user?.name}</p>
                                <Link to = "/dashboard">Dashboard</Link>
                            </div>
                        </>
                    )}

                    {!token && (
                        <>
                            <Button variant='primary' onClick={() => navigate("/sign-up")}>Sign Up</Button>
                            <Button variant='secondary' onClick={() => navigate("/sign-in")}>Sign In</Button>
                            {/* <Link to = "/sign-in">Sign In</Link>
                            <Link to = "/sign-up">Sign Up</Link> */}
                        </>
                    )}
                </nav>
            </div>
        </div>
    </>
  )
}
