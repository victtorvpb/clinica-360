import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ROUTES } from "./routes";

const Dashboard = lazy(() =>
  import("../pages/Dashboard").then((module) => ({ default: module.Dashboard }))
);
const Patients = lazy(() =>
  import("../pages/Patients").then((module) => ({ default: module.Patients }))
);
const Appointments = lazy(() =>
  import("../pages/Appointments").then((module) => ({
    default: module.Appointments,
  }))
);
const Doctors = lazy(() =>
  import("../pages/Doctors").then((module) => ({ default: module.Doctors }))
);
const Consultations = lazy(() =>
  import("../pages/Consultations").then((module) => ({
    default: module.Consultations,
  }))
);
const Register = lazy(() =>
  import("../pages/Register").then((module) => ({ default: module.Register }))
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
        <Register />
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
            <Patients />
          </PageWrapper>
        ),
      },
      {
        path: "appointments",
        element: (
          <PageWrapper>
            <Appointments />
          </PageWrapper>
        ),
      },
      {
        path: "doctors",
        element: (
          <PageWrapper>
            <Doctors />
          </PageWrapper>
        ),
      },
      {
        path: "consultations",
        element: (
          <PageWrapper>
            <Consultations />
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
