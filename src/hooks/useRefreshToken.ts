import { useAuth } from "./useAuth"
import { axiosBasic } from "../api/axios";

export const useRefreshToken = () => {
    const {user, setToken, setUser} = useAuth();

    const refresh = async() => {
        const response = await axiosBasic.get('auth/refresh', {
            withCredentials: true,
        });

        setToken(response.data.token);
        setUser(response.data.user);
        return (response.data.token, response.data.user);
    }
  return refresh;
  
}
