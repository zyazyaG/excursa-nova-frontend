import AuthForm from "../../components/AuthForm/AuthForm";
import { authApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthFormData } from "../../types/auth";
import { saveStoredItinerary } from "../../api/iterinaryApi";
import { TravelPreferences } from "../../types/travel-preferences";
import styles from "./SignUp.module.css";
import Button from "../../components/Button/Button";

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Create Your Account</h3>
        <p>Let's plan your next adventure together</p>
      </div>
      <div className={styles.authForm}>
        <AuthForm type="signup" onSubmit={handleSubmit} error={error} />
      </div> 

      <div className={styles.signIn}>
        <h4>Signed up already? Let's log you in!</h4>
        <Button variant="secondary" style={{ marginTop: "15px", width: "200px", height: "40px" }} onClick={() => navigate("/sign-in")}>Sign In</Button>
      </div>
    </div>
  );
}