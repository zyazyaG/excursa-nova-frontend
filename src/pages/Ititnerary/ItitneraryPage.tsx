import { useNavigate, useParams } from "react-router-dom";
import { Itinerary } from "../../types/itinerary"
import styles from "./Ititnerary.module.css";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import MarkdownOutput from "../../components/MarkdownOutput/MarkdownOutput";
import { formatDate } from "../../utils";
import Button from "../../components/Button/Button";


export const ItitneraryPage = ()  => {
    const {_id} = useParams();
    const [itinerary, setItinerary] = useState<Itinerary>();
    const axiosPrivate = useAxios();
    const navigator = useNavigate();

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

  return (
    <div className={styles.container}>
        {itinerary &&
            <div className={styles.itinerary}>
                <div className={styles.image}><img src={itinerary.imgURL[0]} alt="Image from Unsplash" title={itinerary.imgURL[2]} /></div>
            
                <div className={styles.inner}>
                    <div className={styles.left}>
                        <div className={styles.back}><Button onClick={() => navigator(-1)}>←</Button></div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.header}>
                            <h2>{itinerary.name || itinerary.destination}</h2>
                            <div className={styles.date}>
                                <div>{formatDate(itinerary.startDate)} → {formatDate(itinerary.endDate)}</div>
                                <div className={styles.style}>{itinerary.style}</div>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <MarkdownOutput markdown={itinerary.content} />      
                        </div>


                    </div>
                </div>
            </div>
        }





{/* \        <div className={styles.inner}>
            {itinerary && 
                <div className={styles.itinerary}>
                    <div className={styles.header}>
                        <h2>{itinerary.name}</h2>
                    </div>
                    <div className={styles.image}><img src={itinerary.imgURL[0]} alt="Image from Unsplash" title={itinerary.imgURL[2]}/></div>
                    <div>
                    <MarkdownOutput markdown={itinerary.content} />
                    </div>
                </div>
            }
            
        </div> */}

    </div>
  )
}
