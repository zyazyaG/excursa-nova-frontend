import AuthForm from "../../components/AuthForm/AuthForm";
import { authApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthFormData } from "../../types/auth";
import styles from "./SignUp.module.css";
import Button from "../../components/Button/Button";
import { useHandlePendingItinerary } from "../../hooks/useHandlePending";

export default function SignUpPage() {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { handle: handlePendingItinerary } = useHandlePendingItinerary();

  const handleSubmit = async (formData: AuthFormData) => {
    try {
      setLoading(true);
      const response = await authApi(formData, "signup");

      if (response) {
        setUser(response.user);
        setToken(response.token);

        await handlePendingItinerary(response.token);

        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Create Your Account</h3>
        <p>Let's plan your next adventure together</p>
      </div>
      <div className={styles.authForm}>
        <AuthForm
          type="signup"
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
      </div>

      <div className={styles.signIn}>
        <h4>Signed up already? Let's log you in!</h4>
        <Button
          variant="secondary"
          style={{
            marginTop: "15px",
            width: "200px",
            height: "40px",
          }}
          onClick={() => navigate("/sign-in")}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
