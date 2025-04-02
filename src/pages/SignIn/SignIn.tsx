import AuthForm from "../../components/AuthForm/AuthForm";
import { authApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthFormData, AuthResponse } from "../../types/auth";

export default function SignInPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>();
  const [user, setUser] = useState<AuthResponse>(); //temp user instead of context

  const handleSubmit = async (formData: AuthFormData) => {
    try {
      const user = await authApi(formData, "signin");
      setUser(user);

    } catch (err: any) {
      setError(err.message || "Signin failed.");
    }
  };

  return (
    <div>
      <AuthForm type="signin" onSubmit={handleSubmit} error={error} />
      {user && <div><p>{user.user.name}</p></div>}
    </div>
  );
}