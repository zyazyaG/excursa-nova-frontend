import { useState, useEffect } from "react";
import { TravelPreferences } from "../../types/travel-preferences";
import { generateItinerary } from "../../api/iterinaryApi";
import MarkdownOutput from "../../components/MarkdownOutput/MarkdownOutput";
import TravelForm from "../../components/TravelForm/TravelForm";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import styles from "./Generate.module.css";

export default function Generate() {
  const [itinerary, setItinerary] = useState<string>("");
  const [data, setData] = useState<TravelPreferences | null>(null);
  const [generating, setGenerating] = useState(false); 
  const [saving, setSaving] = useState(false); 
  const navigator = useNavigate();
  const { user } = useAuth();
  const axiosPrivate = useAxios();

  const handleSave = async () => {
    if (!data || !itinerary) return;

    const payload = {
      ...data,
      content: itinerary
    };

    try {
      setSaving(true);
      const response = await axiosPrivate.post("/itineraries", payload);
      console.log("Saved:", response.data);

      sessionStorage.removeItem("travelApp_pendingItinerary");
      sessionStorage.removeItem("travelApp_pendingPreferences");

    } catch (error) {
      console.error("Failed to save itinerary:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleFormSubmit = async (formData: TravelPreferences) => {
    try {
      setGenerating(true);

      const destinationWithCities = formData.cities.length ? `${formData.destination}: ${formData.cities.join(", ")}` : formData.destination;
      const finalData = {...formData, destination: destinationWithCities};

      const newItinerary = await generateItinerary(finalData);
      setItinerary(newItinerary);
      setData(finalData);

    } catch (error) {
      console.error("Itinerary generation failed:", error);
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (itinerary && data) {
      sessionStorage.setItem("travelApp_pendingItinerary", itinerary);
      sessionStorage.setItem(
        "travelApp_pendingPreferences",
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
                ? (
                  <Button variant="primary" onClick={handleSave} disabled={saving} className={styles.saveButton}>
                    {saving ? "Saving..." : "Save Itinerary"}
                  </Button>
                ) 
                : (
                  <Button variant="primary" onClick={() => navigator("/sign-up")} className={styles.saveButton}>
                    Sign Up
                  </Button>
                )
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
