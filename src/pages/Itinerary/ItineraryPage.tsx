import { useNavigate, useParams } from "react-router-dom";
import { Itinerary } from "../../types/itinerary"
import styles from "./Itinerary.module.css";
import { useEffect, useRef, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import MarkdownOutput from "../../components/MarkdownOutput/MarkdownOutput";
import { formatDate } from "../../utils";
import Button from "../../components/Button/Button";
import { FaPrint } from "react-icons/fa";


export const ItineraryPage = ()  => {
    const {_id} = useParams();
    const [itinerary, setItinerary] = useState<Itinerary>();
    const axiosPrivate = useAxios();
    const navigator = useNavigate();
    const printRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getItitnerary = async() => {
            try {
                const response = await axiosPrivate.get(`/itineraries/${_id}`, {signal: controller.signal});
                isMounted && setItinerary(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getItitnerary();

        return () => {
            isMounted = false;
            controller.abort();
        }
    },[_id]);

    const handlePrint = () => {
        if (printRef.current) {
            const printContents = printRef.current.innerHTML;
            const originalContents = document.body.innerHTML;
    
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.href = window.location.href;
        }
    };

  return (
    <div className={styles.container}>
        {itinerary &&
            <div className={styles.itinerary}>
                <div className={styles.image}><img src={itinerary.imgURL[0]} alt="Image from Unsplash" title={itinerary.imgURL[2]} /></div>
            
                <div className={styles.inner}>
                    <div className={styles.left}>
                        <div className={styles.back}><Button onClick={() => navigator(-1)}>←</Button></div>
                    </div>
                    <div className={styles.right} ref = {printRef}>
                        <div className={styles.header}>
                            <h2>{itinerary.name || itinerary.destination}</h2>
                            <div className={styles.subHeader}>
                                
                                <div className={styles.date}>
                                    <div>{formatDate(itinerary.startDate)} → {formatDate(itinerary.endDate)}</div>
                                    <div className={styles.style}>{itinerary.style}</div>
                                </div>
                                <div onClick={handlePrint}><FaPrint /></div>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <MarkdownOutput markdown={itinerary.content} />      
                        </div>
                    </div>
                </div>
            </div>
        }

    </div>
  )
}
