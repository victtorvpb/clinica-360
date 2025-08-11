export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  REGISTER: "/register",
  PATIENTS: "/patients",
  APPOINTMENTS: "/appointments",
  DOCTORS: "/doctors",
  CONSULTATIONS: "/consultations",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

export const getRoute = (route: RouteKey): RoutePath => ROUTES[route];

export const isValidRoute = (path: string): path is RoutePath => {
  return Object.values(ROUTES).includes(path as RoutePath);
}; 
