import { useState, useEffect } from "react";
import { TravelPreferences } from "../../types/travel-preferences";
import { generateIterinary } from "../../api/iterinaryApi";
import MarkdownOutput from "../../components/MarkdownOutput/MarkdownOutput";
import TravelForm from "../../components/TravelForm/TravelForm";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function Generate() {
  const [itinerary, setItinerary] = useState("");
  const [data, setData] = useState<TravelPreferences>();
  const navigator = useNavigate();
  const {setPendingItinerary, setPendingPreferences} = useAuth();

  const handleClick = () => {
    navigator("/sign-in");
  }

  const handleFormSubmit = async (data: TravelPreferences) => {
    try {
      
      const itinerary = await generateIterinary(data);
      setItinerary(itinerary);
      setData(data);
    } catch (error) {
      console.log("Failed ---", error);
    }
  };

  useEffect(() => {
    if (itinerary) {
      // localStorage.setItem("pendingItinerary", itinerary);
      // localStorage.setItem("pendingPreferences", JSON.stringify(data));
      setPendingItinerary(itinerary);
      setPendingPreferences(data!);
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
              <Button variant="primary" onClick={() => handleClick()} style={{ marginTop: "15px" }}>Sign In</Button>
            </div>
          )}
        
      </div>
    </div>
  );
}
