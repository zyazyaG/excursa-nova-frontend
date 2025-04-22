import { useState, useEffect } from "react";
import { TravelPreferences } from "../../types/travel-preferences";
import { generateIterinary, saveStoredItinerary } from "../../api/iterinaryApi";
import MarkdownOutput from "../../components/MarkdownOutput/MarkdownOutput";
import TravelForm from "../../components/TravelForm/TravelForm";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";


export default function Generate() {
  
  const [itinerary, setItinerary] = useState("");
  const [data, setData] = useState<TravelPreferences>();
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
      if (data.cities.length) {
        data.destination = data.destination + ": "  + data.cities.map((city) => city).join(', ');
      }
      const itinerary = await generateIterinary(data);
      setItinerary(itinerary);
      setData(data);
    } catch (error) {
      console.log("Failed ---", error);
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
    <div>
      <div className="header">
        <h3>Fill out form</h3>
      </div>

      <div className="form">
        <TravelForm onSubmit={handleFormSubmit} />
        {itinerary && 
          (     
            <div>
              <MarkdownOutput markdown={itinerary} />
            </div>
          )}
        
      </div>
      <div>
        {itinerary && !user && (
          <div>
            <h4>Would you want to save the Trip?</h4>
            <Button variant="primary" onClick={() => navigator("/sign-up")} style={{ marginTop: "15px" }}>Sign Up</Button></div>
        )}
        {itinerary && user && (
          <div>
            <Button variant="primary" onClick={() => handleClick()} style={{ marginTop: "15px" }}>Save Itinearary</Button>
          </div>
        )}
      </div>
    </div>
  );
}
