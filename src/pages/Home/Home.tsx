import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";


export default function Home() {

    const navigate = useNavigate()

    const handleClick = (path: string) => {
        navigate(path);
    }

    return(
    <>
        <div>
            <div>
                <h3>Plan unforgettable trips with the power of AI.</h3>
            </div>
            <div>
                <Button variant="primary" onClick={() => handleClick("/generate")}>Plan Your First Trip</Button>
                <Button variant="secondary" onClick={() => handleClick("/sign-in")}>Sign In</Button>
                <Button variant="secondary" onClick={() => handleClick("/sign-up")}>Sign Up</Button>
            </div>
        </div>
    </>);

};

