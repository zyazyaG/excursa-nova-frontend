import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();
  // if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/sign-in" replace />;

  return <>{children}</>;
}