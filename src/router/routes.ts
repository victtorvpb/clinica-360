// Route constants for consistency
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  REGISTER: "/register",
  PATIENTS: "/patients",
  APPOINTMENTS: "/appointments",
  DOCTORS: "/doctors",
  CONSULTATIONS: "/consultations",
} as const;

// Type for route validation
export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

// Helper for programmatic navigation
export const getRoute = (route: RouteKey): RoutePath => ROUTES[route];

// Validate if a route exists
export const isValidRoute = (path: string): path is RoutePath => {
  return Object.values(ROUTES).includes(path as RoutePath);
}; 
