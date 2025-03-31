import { useState } from "react";
import { TravelPreferences } from "../../types/travel-preferences";
import { generateIterinary } from "../../api/iterinaryApi";
import MarkdownOutput from "../../components/MarkdownOutput/MarkdownOutput";
import TravelForm from "../../components/TravelForm/TravelForm";

export default function Generate() {
  const [itinerary, setItinerary] = useState("");

  const handleFormSubmit = async (data: TravelPreferences) => {
    try {
      const itinerary = await generateIterinary(data);
      setItinerary(itinerary);
    } catch (error) {
      console.log("Failed ---", error);
    }
  };

  return (
    <div>
      <div className="header">
        <h3>Fill out form</h3>
      </div>

      <div className="form">
        <TravelForm onSubmit={handleFormSubmit} />
        {itinerary && <MarkdownOutput markdown={itinerary} />}
      </div>
    </div>
  );
}
