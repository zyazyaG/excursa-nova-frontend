import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";


export default function Home() {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('generate')
    }

    return(
    <>
        <div>
            <div>
                <h3>Plan unforgettable trips with the power of AI.</h3>
            </div>
            <div><Button variant="primary" onClick={handleClick}>Get Started</Button></div>
        </div>
    </>);

};

