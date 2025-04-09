import { createContext, useEffect, useState, ReactNode } from "react";
import { AuthResponse } from "../types/auth";
import { User } from "../types/user";
import { saveStoredItinerary } from "../api/iterinaryApi";
import { TravelPreferences } from "../types/travel-preferences";

interface AuthContextType {
    user: User | null;
    token: string | null;
    signIn: (auth: AuthResponse) => void;
    signOut: () => void;
    pendingItinerary: string | null;
    pendingPreferences: TravelPreferences | null;
    setPendingPreferences: (prefs: TravelPreferences | null) => void;
    setPendingItinerary: (itinerary: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [pendingItinerary, setPendingItinerary] = useState<string | null>(null);
    const [pendingPreferences, setPendingPreferences] = useState<TravelPreferences | null>(null);


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const storedPendingItinerary = localStorage.getItem("pendingItinerary");
        const storedPendingPreferences = localStorage.getItem("pendingPreferences")
        if (storedToken && storedUser && pendingItinerary) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        if (storedPendingItinerary && storedPendingPreferences) {
            setPendingItinerary(storedPendingItinerary);
            setPendingPreferences(JSON.parse(storedPendingPreferences) as TravelPreferences);
        }
    }, []);

    const signIn = async (auth: AuthResponse) => {
        setToken(auth.token);
        setUser(auth.user);
        localStorage.setItem("token", auth.token);
        localStorage.setItem("user", JSON.stringify(auth.user));
        
        if (pendingItinerary && pendingPreferences) {
            try {
                await saveStoredItinerary(pendingItinerary, pendingPreferences, auth.token);
            } catch (err) {
                console.error("Failed to save pending itinerary:", err);
            } finally {
                setPendingItinerary(null);
                localStorage.removeItem("pendingItinerary");
            }
        }
    };

    const signOut = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{user, token, signIn, signOut, pendingItinerary, pendingPreferences, setPendingPreferences, setPendingItinerary}}>
            { children }
        </AuthContext.Provider>
    );
}