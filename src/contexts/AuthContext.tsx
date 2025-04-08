import { createContext, useEffect, useState, ReactNode } from "react";
import { AuthResponse } from "../types/auth";
import { User } from "../types/user";
import { saveStoredItinerary } from "../api/iterinaryApi";

interface AuthContextType {
    user: User | null;
    token: string | null;
    signIn: (auth: AuthResponse) => void;
    signOut: () => void;
    pendingItinerary: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [pendingItinerary, setPendingItinerary] = useState<string | null>(null);


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const storedPendingItinerary = localStorage.getItem("pendingItinerary");

        if (storedToken && storedUser && pendingItinerary) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        if (storedPendingItinerary) {
            setPendingItinerary(storedPendingItinerary);
        }
    }, []);

    const signIn = async (auth: AuthResponse) => {
        setToken(auth.token);
        setUser(auth.user);
        localStorage.setItem("token", auth.token);
        localStorage.setItem("user", JSON.stringify(auth.user));
        
        if (pendingItinerary) {
            try {
                await saveStoredItinerary(pendingItinerary, auth.token);
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
        <AuthContext.Provider value={{user, token, signIn, signOut, pendingItinerary}}>
            { children }
        </AuthContext.Provider>
    );
}