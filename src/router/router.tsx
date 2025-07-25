import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ROUTES } from "./routes";

const Dashboard = lazy(() =>
  import("../pages/Dashboard").then((module) => ({ default: module.Dashboard }))
);
const Pacientes = lazy(() =>
  import("../pages/Pacientes").then((module) => ({ default: module.Pacientes }))
);
const Agendamentos = lazy(() =>
  import("../pages/Agendamentos").then((module) => ({
    default: module.Agendamentos,
  }))
);
const Medicos = lazy(() =>
  import("../pages/Medicos").then((module) => ({ default: module.Medicos }))
);
const Consultas = lazy(() =>
  import("../pages/Consultas").then((module) => ({ default: module.Consultas }))
);
const Cadastro = lazy(() =>
  import("../pages/Cadastro").then((module) => ({ default: module.Cadastro }))
);

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);
export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <PageWrapper>
        <Cadastro />
      </PageWrapper>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: (
          <PageWrapper>
            <Dashboard />
          </PageWrapper>
        ),
      },
      {
        path: "patients",
        element: (
          <PageWrapper>
            <Pacientes />
          </PageWrapper>
        ),
      },
      {
        path: "appointments",
        element: (
          <PageWrapper>
            <Agendamentos />
          </PageWrapper>
        ),
      },
      {
        path: "doctors",
        element: (
          <PageWrapper>
            <Medicos />
          </PageWrapper>
        ),
      },
      {
        path: "consultations",
        element: (
          <PageWrapper>
            <Consultas />
          </PageWrapper>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600 mb-6">Page not found</p>
        <a
          href={ROUTES.DASHBOARD}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Back to Dashboard
        </a>
      </div>
    ),
  },
]);
