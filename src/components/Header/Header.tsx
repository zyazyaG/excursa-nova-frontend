import { Link, useNavigate } from 'react-router-dom';
import styles from "./Header.module.css";
import Button from '../Button/Button';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '@mui/material';

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
                                <Link to = "/dashboard">Dashboard</Link>
                                <Link to = "/itineraries">Itineraries</Link>
                                <Avatar sx={{bgcolor: "#1F808D", width: 35, height: 35, mx: 1}}>{user?.name[0]}</Avatar>
                                <p className={styles.avatar}>Hello, <br/>{user?.name}</p>
                                
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
