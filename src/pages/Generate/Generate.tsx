import { useState, useEffect } from "react";
import { TravelPreferences } from "../../types/travel-preferences";
import { generateIterinary, saveStoredItinerary } from "../../api/iterinaryApi";
import MarkdownOutput from "../../components/MarkdownOutput/MarkdownOutput";
import TravelForm from "../../components/TravelForm/TravelForm";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import styles from "./Generate.module.css";


export default function Generate() {
  
  const [itinerary, setItinerary] = useState("");
  const [data, setData] = useState<TravelPreferences>();
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const {user} = useAuth();
  const axiosPrivate = useAxios();
  // const {setPendingItinerary, setPendingPreferences} = useAuth();

  const handleClick = async () => {
    const controller = new AbortController();
    const payload = {...data, content: itinerary};

    try {
      const response = await axiosPrivate.post("/itineraries", payload, {signal: controller.signal});
      
      console.log(response.data);
    }
    catch(error) {
      console.log(error);
    }
    controller.abort();
  }

  const handleFormSubmit = async (data: TravelPreferences) => {
    try {
      setLoading(true);
      if (data.cities.length) {
        data.destination = data.destination + ": "  + data.cities.map((city) => city).join(', ');
      }
      const itinerary = await generateIterinary(data);
      setItinerary(itinerary);
      setData(data);
    } catch (error) {
      console.log("Failed ---", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itinerary) {
      localStorage.setItem("pendingItinerary", itinerary);
      localStorage.setItem("pendingPreferences", JSON.stringify(data));
      // setPendingItinerary(itinerary);
      // setPendingPreferences(data!);
    }
  }, [itinerary]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Smarter travel starts with this form.</h3>
        <p>Answer a few and take off soon.</p>
      </div>

      <div className={styles.form}>
        <TravelForm onSubmit={handleFormSubmit} loading={loading} />   
      </div>
      
      <div className={styles.itinerary}>
        {itinerary && 
            (   
              <div className={styles.itineraryContainer}>
                <div className={styles.links}>
                  <h4 className={styles.hOne}>Like your Trip?</h4><h4 className={styles.hTwo}> Then don't forget to Save it!</h4>
                  {user 
                    ? <Button variant="primary" onClick={() => handleClick()} style={{height: "40px"}}>Save Itinearary</Button> 
                    : <Button variant="primary" onClick={() => navigator("/sign-up")} style={{height: "40px"}}>Sign Up</Button> }
               
                </div>
                <div className={styles.markdown}>
                  <MarkdownOutput markdown={itinerary} />
                </div>
              </div>  
              
            )}
      </div>
    </div>
  );
}
