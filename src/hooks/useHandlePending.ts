import { useAxios } from "../hooks/useAxios";

export const useHandlePendingItinerary = () => {
    const axiosPrivate = useAxios();

    const handle = async (token: string) => {
        const pendingItinerary = localStorage.getItem("pendingItinerary");
        const pendingPreferences = localStorage.getItem("pendingPreferences");

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

            localStorage.removeItem("pendingItinerary");
            localStorage.removeItem("pendingPreferences");
        }
    };

    return { handle };
};
