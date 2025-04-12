import AuthForm from "../../components/AuthForm/AuthForm";
import { authApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthFormData } from "../../types/auth";

export default function SignUpPage() {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>();

  const handleSubmit = async (formData: AuthFormData) => {
    try {
      const response = await authApi(formData, "signup");
      // const response = await signUpApi(formData.email, formData.password);
      if (response) {
        setUser(response.user);
        setToken(response.token);
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