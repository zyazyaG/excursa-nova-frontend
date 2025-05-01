import AuthForm from "../../components/AuthForm/AuthForm";
import { authApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthFormData } from "../../types/auth";
import { useAuth } from "../../hooks/useAuth";
import styles from "./SignIn.module.css";
import Button from "../../components/Button/Button";
import { useHandlePendingItinerary } from "../../hooks/useHandlePending";

export default function SignInPage() {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { handle: handlePendingItinerary } = useHandlePendingItinerary();

  const handleSubmit = async (formData: AuthFormData) => {
    try {
      setLoading(true);
      const response = await authApi(formData, "signin");

      if (response) {
        setUser(response.user);
        setToken(response.token);

        await handlePendingItinerary(response.token);

        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Signin failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Back for another adventure?</h3>
        <p>Sign in to continue your journey.</p>
      </div>
      <div className={styles.authForm}>
        <AuthForm
          type="signin"
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
      </div>
      <div className={styles.signIn}>
        <h4>New here? Let's get you started!</h4>
        <Button
          variant="secondary"
          style={{ marginTop: "15px", width: "200px", height: "40px" }}
          onClick={() => navigate("/sign-up")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
