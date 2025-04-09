import { TravelPreferences } from "../types/travel-preferences";
import { Itinerary } from "../types/itinerary";

export async function generateIterinary(preferences:TravelPreferences) {
    
    const response = await fetch("http://localhost:3600/api/itineraries/generate-itinerary", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences)
    });

    if (!response.ok) {
        throw new Error("Failed to generate");
    }
    return await response.json();  
};


export async function saveStoredItinerary(pendingItinerary: string, pendingPreferences: TravelPreferences,  token: string) {
    const payload = {...pendingPreferences, content: pendingItinerary};
    const response = await fetch("http://localhost:3600/api/itineraries/", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error ("Failed to save the itinerary!");
    }
    return await response.json();

};

export async function getAllItineraries(token: string) {
    const response = await fetch("http://localhost:3600/api/itineraries/", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "appliction/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch all itineraries!")
    }
    const data: Itinerary [] = await response.json();
    return data;
}