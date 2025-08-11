import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { authService } from "../services/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate(ROUTES.LOGIN);
    }
  }, [navigate]);

  // Se não estiver autenticado, não renderiza nada (será redirecionado)
  if (!authService.isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
