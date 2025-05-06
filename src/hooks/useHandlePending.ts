import { useAxios } from "../hooks/useAxios";

export const useHandlePendingItinerary = () => {
    const axiosPrivate = useAxios();

    const handle = async (token: string) => {
        const pendingItinerary = sessionStorage.getItem("travelApp_pendingItinerary");
        const pendingPreferences = sessionStorage.getItem("travelApp_pendingPreferences");

        let preferences = null;
        try {
            preferences = pendingPreferences ? JSON.parse(pendingPreferences) : null;
        } catch {
            preferences = null;
        }

        if (pendingItinerary && preferences) {
            const payload = { ...preferences, content: pendingItinerary };
            await axiosPrivate.post("/itineraries", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            sessionStorage.removeItem("travelApp_pendingItinerary");
            sessionStorage.removeItem("travelApp_pendingPreferences");
        }
    };

    return { handle };
};
