import { useContext, useDebugValue } from "react";
import { AuthContext } from "../contexts/AuthContext";


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;

    // const context = useContext(AuthContext);
    // useDebugValue(context, context => context?.user ? "Logged In" : "Logged Out");
    // return context;
};