import AuthForm from "../../components/AuthForm/AuthForm";
import { authApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthFormData } from "../../types/auth";
import { saveStoredItinerary } from "../../api/iterinaryApi";
import { TravelPreferences } from "../../types/travel-preferences";

export default function SignUpPage() {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>();

  const handleSubmit = async (formData: AuthFormData) => {
    const pendingItinerary = localStorage.getItem("pendingItinerary");
    const pendingPreferences = localStorage.getItem("pendingPreferences");
    try {
      const response = await authApi(formData, "signup");
      // const response = await signUpApi(formData.email, formData.password);
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
      setError(err.message || "Signup failed.");
    }
  };

  return (
    <div>
      <AuthForm type="signup" onSubmit={handleSubmit} error={error} />
    </div>
  );
}