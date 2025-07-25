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
    // Atalhos para rotas mais usadas
    goToDashboard: () => goTo("DASHBOARD"),
    goToCadastro: () => goTo("CADASTRO"),
    goToPacientes: () => goTo("PACIENTES"),
    goToAgendamentos: () => goTo("AGENDAMENTOS"),
    goToMedicos: () => goTo("MEDICOS"),
    goToConsultas: () => goTo("CONSULTAS"),
  };
}; 
