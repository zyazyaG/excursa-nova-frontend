import { useState, useEffect } from "react";
import { TravelPreferences } from "../../types/travel-preferences";
import { generateIterinary } from "../../api/iterinaryApi";
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
  const [generating, setGenerating] = useState(false); 
  const [saving, setSaving] = useState(false); 
  const navigator = useNavigate();
  const { user } = useAuth();
  const axiosPrivate = useAxios();

  const handleClick = async () => {
    if (!data || !itinerary) return;

    const payload = { ...data, content: itinerary };

    try {
      setSaving(true);
      const response = await axiosPrivate.post("/itineraries", payload);
      console.log("Saved:", response.data);

      localStorage.removeItem("pendingItinerary");
      localStorage.removeItem("pendingPreferences");
    } catch (error) {
      console.error("Failed to save itinerary:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleFormSubmit = async (formData: TravelPreferences) => {
    try {
      setGenerating(true);

      const tempData = { ...formData };

      if (tempData.cities.length) {
        tempData.destination +=": " + tempData.cities.join(", ");
      }

      const newItinerary = await generateIterinary(tempData);
      setItinerary(newItinerary);
      setData(tempData);
    } catch (error) {
      console.error("Itinerary generation failed:", error);
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (itinerary && data) {
      localStorage.setItem("pendingItinerary", itinerary);
      localStorage.setItem(
        "pendingPreferences",
        JSON.stringify(data)
      );
    }
  }, [itinerary, data]); 

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Smarter travel starts with this form.</h3>
        <p>Answer a few and take off soon.</p>
      </div>

      <div className={styles.form}>
        <TravelForm onSubmit={handleFormSubmit} loading={generating} />
      </div>

      <div className={styles.itinerary}>
        {itinerary && (
          <div className={styles.itineraryContainer}>
            <div className={styles.links}>
              <h4 className={styles.hOne}>Like your Trip?</h4>
              <h4 className={styles.hTwo}>
                Then don't forget to Save it!
              </h4>
              {user 
              ? (<Button variant="primary" onClick={handleClick} style={{ height: "40px" }} disabled={saving}>{saving ? "Saving..." : "Save Itinerary"}</Button>) 
              : (<Button variant="primary" onClick={() => navigator("/sign-up")} style={{ height: "40px" }}>Sign Up</Button>)
              }
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
