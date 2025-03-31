import { TravelPreferences } from "../types/travel-preferences";

export async function generateIterinary(preferences:TravelPreferences) {
    const response = await fetch("http://localhost:3600/api/itineraries/generate-itinerary", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(preferences)
    });

    if (!response.ok) {
        throw new Error("Failed to generate");
    }
    return await response.json();  
}