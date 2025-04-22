import AuthForm from "../../components/AuthForm/AuthForm";
import { authApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthFormData } from "../../types/auth";
import { useAuth } from "../../hooks/useAuth";
import { saveStoredItinerary } from "../../api/iterinaryApi";
import { TravelPreferences } from "../../types/travel-preferences";

export default function SignInPage() {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: AuthFormData) => {
    const pendingItinerary = localStorage.getItem("pendingItinerary");
    const pendingPreferences = localStorage.getItem("pendingPreferences")
    try {
      // setLoading(true);
      const response = await authApi(formData, "signin");
      // const response = await signInApi(formData.email, formData.password);
      if (response) {
        setUser(response.user);
        setToken(response.token);
        if (pendingItinerary && pendingPreferences) {
          await saveStoredItinerary(pendingItinerary, JSON.parse(pendingPreferences) as TravelPreferences, response.token);
          localStorage.removeItem("pendingItinerary");
          localStorage.removeItem("pendingPreferences");
        }
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Signin failed.");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div>
      <AuthForm type="signin" onSubmit={handleSubmit} error={error} />
    </div>
  );
}
