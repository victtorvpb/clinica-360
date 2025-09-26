import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../router/routes";
import { useAuth } from "../hooks/useAuth";
import { useAlert } from "../hooks/useAlert";
import { LanguageSelector } from "../components/LanguageSelector";

export function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showSuccess, showError, showLoading, dismiss } = useAlert();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingId = showLoading("Autenticando...");

    try {
      const response = await login(formData.email, formData.password);
      dismiss(loadingId);
      showSuccess(`Bem-vindo, ${response.user.name}!`);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      dismiss(loadingId);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Email ou senha incorretos. Tente novamente.";
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Usuários disponíveis para teste (backend real)
  const availableUsers = [
    {
      email: "admin@clinica360.com",
      password: "admin123",
      name: "Administrador",
      role: "admin",
    },
    {
      email: "medico@clinica360.com",
      password: "medico123",
      name: "Dr. João Silva",
      role: "medico",
    },
    {
      email: "enfermeiro@clinica360.com",
      password: "enfermeiro123",
      name: "Maria Santos",
      role: "enfermeiro",
    },
    {
      email: "recepcionista@clinica360.com",
      password: "recepcionista123",
      name: "Ana Costa",
      role: "recepcionista",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Header com LanguageSelector */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector dropdownDirection="left" />
      </div>

      {/* Lado esquerdo - Texto promocional */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary-600 to-primary-800 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-800/90"></div>

        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full"></div>

        <div className="relative z-10 max-w-md text-center text-white">
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4">
              {t("login.accessClinic")}
            </h3>
            <p className="text-xl text-white/90 mb-6">
              {t("login.manageDescription")}
            </p>
            <div className="space-y-4 text-left">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>{t("login.smartScheduling")}</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>{t("login.digitalRecords")}</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>{t("login.detailedReports")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t("login.title")}
            </h2>
            <p className="text-gray-600">{t("login.subtitle")}</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">💊</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-semibold text-gray-700">
                  Clinica
                </span>
                <span className="text-2xl font-bold text-primary-600">360</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("login.email")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t("login.emailPlaceholder")}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("login.password")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t("login.passwordPlaceholder")}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {t("login.rememberMe")}
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {t("login.forgotPassword")}
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t("login.loggingIn")}
                </div>
              ) : (
                t("login.loginButton")
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {t("login.noAccount")}{" "}
                <Link
                  to={ROUTES.REGISTER}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {t("login.createAccount")}
                </Link>
              </p>
            </div>
          </form>

          {/* Seção de credenciais para desenvolvimento */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowCredentials(!showCredentials)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {showCredentials ? "Ocultar" : "Mostrar"} credenciais de teste
            </button>

            {showCredentials && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Usuários disponíveis para teste:
                </h4>
                <div className="space-y-2">
                  {availableUsers.map((user, index) => (
                    <div key={index} className="text-xs text-gray-600">
                      <div className="font-medium">
                        {user.name} ({user.role})
                      </div>
                      <div>Email: {user.email}</div>
                      <div>Senha: {user.password}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
