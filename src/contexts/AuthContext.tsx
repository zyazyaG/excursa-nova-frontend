import { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../types/user";
import { axiosBasic } from "../api/axios";
import { useNavigate } from "react-router";


interface AuthContextType {
    user: User | null;
    token: string | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    signOut: () => void;
    loading: boolean;

}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children} : {children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const signOut = async () => {
        try {
            console.log("we are here");
            await axiosBasic.get("auth/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
                withCredentials: true,
            });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setUser(null);
            setToken(null);
            navigate("/");
        }
    };

    useEffect(() => {
        const tryRefresh = async () => {
            try {
                const res = await axiosBasic.get('auth/refresh', {withCredentials: true});
                setToken(res.data.token);
                setUser(res.data.user); 
            } catch (err) {
                console.log("Silent refresh failed:", err);
            } finally {
                setLoading(false);
            }
        };
    
        tryRefresh();
    }, []);
    

    return (
        <AuthContext.Provider value={{user, setUser, token, setToken, signOut, loading}}>
            {children}
        </AuthContext.Provider>
    );
};
