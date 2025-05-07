import { Link, useNavigate } from 'react-router-dom';
import styles from "./Header.module.css";
import Button from '../Button/Button';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Header() {
    const navigate = useNavigate();
    const { user, token, signOut } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        console.log("here")
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <>
        <div className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.headerInner}>
                <div className={styles.logo}>
                    {user ? <Link to="/dashboard">Logo</Link> : <Link to="/">Excursa Nova</Link>}
                </div>
                <nav className={styles.nav}>
                    {token ? (
                        <div className={styles.signed}>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/itineraries">Itineraries</Link>
                            <Button variant="secondary" onClick={signOut}>Log Out</Button>
                            <Avatar sx={{ bgcolor: "#1F808D", width: 35, height: 35, mx: 1 }}>
                                {user?.name[0]}
                            </Avatar>
                            <p className={styles.avatar}>Hello, <br />{user?.name}</p>
                        </div>
                    ) : (
                        <>
                            <Button variant="primary" onClick={() => navigate("/sign-up")}>Sign Up</Button>
                            <Button variant="secondary" onClick={() => navigate("/sign-in")}>Sign In</Button>
                        </>
                    )}
                </nav>
            </div>
        </div>
    </>
  );
}
