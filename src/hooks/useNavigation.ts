import { useNavigate } from "react-router-dom";
import { ROUTES, RouteKey } from "../router/routes";

export const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = (route: RouteKey) => {
    navigate(ROUTES[route]);
  };

  const goToPath = (path: string) => {
    navigate(path);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  return {
    goTo,
    goToPath,
    goBack,
    goForward,
    // Shortcuts for most used routes
    goToDashboard: () => goTo("DASHBOARD"),
    goToRegister: () => goTo("REGISTER"),
    goToPatients: () => goTo("PATIENTS"),
    goToAppointments: () => goTo("APPOINTMENTS"),
    goToDoctors: () => goTo("DOCTORS"),
    goToConsultations: () => goTo("CONSULTATIONS"),
  };
}; 
