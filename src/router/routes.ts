// Constantes de rotas para manter consistência
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  CADASTRO: "/cadastro",
  PACIENTES: "/pacientes",
  AGENDAMENTOS: "/agendamentos",
  MEDICOS: "/medicos",
  CONSULTAS: "/consultas",
} as const;

// Tipo para validação de rotas
export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

// Helper para navegação programática
export const getRoute = (route: RouteKey): RoutePath => ROUTES[route];

// Validar se uma rota existe
export const isValidRoute = (path: string): path is RoutePath => {
  return Object.values(ROUTES).includes(path as RoutePath);
}; 
