import { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../types/user";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { axiosBasic } from "../api/axios";


interface AuthContextType {
    user: User | null;
    token: string | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    signOut: () => void;
    // loading: boolean;
    // setNewToken: (token: string |  null ) => void
    // signIn: (auth: AuthResponse) => void;
    // signOut: () => void;
    // pendingItinerary: string | null;
    // pendingPreferences: TravelPreferences | null;
    // setPendingPreferences: (prefs: TravelPreferences | null) => void;
    // setPendingItinerary: (itinerary: string | null) => void;
    // loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children} : {children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const signOut = () => {
        setUser(null);
        setToken(null);
        window.location.href = "/sign-in";
    };

    // useEffect(() => {
    //     const tryRefresh = async () => {
    //         try {
    //             const res = await axiosBasic.post('auth/refresh', {token}, {withCredentials: true});
    //             setToken(res.data.token);
    //             setUser(res.data.user); // <-- make sure your /refresh endpoint returns user info
    //         } catch (err) {
    //             console.log("Silent refresh failed:", err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    
    //     tryRefresh();
    // }, []);
    

    return (
        <AuthContext.Provider value={{user, setUser, token, setToken, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};
