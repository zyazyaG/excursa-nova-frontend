import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Home.module.css";

export default function Home() {

    const navigate = useNavigate()

    const handleClick = (path: string) => {
        navigate(path);
    }

    return(
    <>
        <div className={styles.container}>
            <div className={styles.right}>
                <div className={styles.header}>
                    <h3>Let your brain pack lighter.</h3>
                    <h4>We plan. You explore.</h4>
                </div>
                <div className={styles.links}>
                    <Button variant="primary" onClick={() => handleClick("/generate")} style={{ padding: "15px", width: "250px", fontSize: "18px" }}>Plan Your First Trip</Button>
                    {/* <Button variant="secondary" onClick={() => handleClick("/sign-in")}>Sign In</Button>
                    <Button variant="secondary" onClick={() => handleClick("/sign-up")}>Sign Up</Button> */}
                </div>
            </div>
        </div>
    </>);

};

