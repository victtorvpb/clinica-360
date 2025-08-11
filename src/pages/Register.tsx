import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../router/routes";
import mulherCadastro from "../assets/images/mulher-cadastro.jpg";

export function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    clinicName: "",
    confirmPassword: "",
    email: "",
    phone: "",
    teamSize: "",
    specialties: [] as string[],
    experience: "",
    softwareUsed: [] as string[],
    mainChallenges: [] as string[],
    name: "",
  });

  const totalSteps = 3;

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Informações Básicas";
      case 2:
        return "Sobre sua clínica";
      case 3:
        return "Experiência e Preferências";
      default:
        return "Conte-nos sobre sua clínica";
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return "Vamos começar com suas informações de login e contato.";
      case 2:
        return "Conte-nos sobre sua clínica";
      case 3:
        return "Vamos personalizar a experiência para sua clínica.";
      default:
        return "Vamos personalizar a experiência para sua clínica.";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name as keyof typeof prev] as string[]), value]
        : (prev[name as keyof typeof prev] as string[]).filter(
            (item) => item !== value
          ),
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nome da sua clínica
        </label>
        <input
          type="text"
          id="clinicName"
          name="clinicName"
          value={formData.clinicName}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Nome fantasia"
        />
      </div>

      <div>
        <label
          htmlFor="teamSize"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Quantas pessoas trabalham na sua clínica?
        </label>
        <select
          id="teamSize"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleSelectChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Selecione</option>
          <option value="1-5">1-5 pessoas</option>
          <option value="6-10">6-10 pessoas</option>
          <option value="11-20">11-20 pessoas</option>
          <option value="21-50">21-50 pessoas</option>
          <option value="50+">Mais de 50 pessoas</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Especialidades principais da clínica
        </label>
        <div className="space-y-2">
          {[
            { value: "clinica-geral", label: "Clínica Geral" },
            { value: "pediatria", label: "Pediatria" },
            { value: "cardiologia", label: "Cardiologia" },
            { value: "dermatologia", label: "Dermatologia" },
            { value: "ortopedia", label: "Ortopedia" },
            { value: "ginecologia", label: "Ginecologia" },
            { value: "psicologia", label: "Psicologia" },
            { value: "odontologia", label: "Odontologia" },
          ].map((specialty) => (
            <label key={specialty.value} className="flex items-center">
              <input
                type="checkbox"
                name="specialties"
                value={specialty.value}
                checked={formData.specialties.includes(specialty.value)}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                {specialty.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Seu nome completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Telefone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="(11) 99999-9999"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Senha
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Crie uma senha segura"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Confirmar senha
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Confirme sua senha"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="experience"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Há quanto tempo você trabalha na área da saúde?
        </label>
        <select
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleSelectChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Selecione</option>
          <option value="menos-1">Menos de 1 ano</option>
          <option value="1-3">1-3 anos</option>
          <option value="4-7">4-7 anos</option>
          <option value="8-15">8-15 anos</option>
          <option value="mais-15">Mais de 15 anos</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quais softwares você já utilizou para gestão de clínicas?
        </label>
        <div className="space-y-2">
          {[
            { value: "nenhum", label: "Nunca usei" },
            { value: "excel", label: "Excel/Planilhas" },
            { value: "icloud", label: "iClinic" },
            { value: "doctoralia", label: "Doctoralia" },
            { value: "clinicorp", label: "Clinicorp" },
            { value: "telemedicina", label: "Plataformas de telemedicina" },
            { value: "outro", label: "Outro" },
          ].map((software) => (
            <label key={software.value} className="flex items-center">
              <input
                type="checkbox"
                name="softwareUsed"
                value={software.value}
                checked={formData.softwareUsed.includes(software.value)}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                {software.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quais são seus principais desafios atualmente?
        </label>
        <div className="space-y-2">
          {[
            { value: "agendamento", label: "Controle de agendamentos" },
            { value: "financeiro", label: "Gestão financeira" },
            { value: "prontuarios", label: "Organização de prontuários" },
            { value: "comunicacao", label: "Comunicação com pacientes" },
            { value: "relatorios", label: "Relatórios e análises" },
            { value: "marketing", label: "Marketing e captação" },
          ].map((challenge) => (
            <label key={challenge.value} className="flex items-center">
              <input
                type="checkbox"
                name="mainChallenges"
                value={challenge.value}
                checked={formData.mainChallenges.includes(challenge.value)}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                {challenge.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Transforme sua clínica
            </h2>
            <p className="text-gray-600">Sistema completo de gestão médica</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary-600 rounded flex items-center justify-center">
                  <span className="text-white text-sm font-bold">💊</span>
                </div>
              </div>
              <span className="text-xl font-semibold text-gray-700">
                Clinica
              </span>
              <span className="text-xl font-bold text-primary-600">360</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {getStepTitle()}
            </h1>
            <p className="text-gray-600 text-sm">{getStepSubtitle()}</p>

            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i + 1 <= currentStep ? "bg-primary-600" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 text-right">
                Passo {currentStep} de {totalSteps}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex space-x-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Voltar
                </button>
              )}
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Continuar
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Finalizar cadastro
                </button>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link
                  to={ROUTES.LOGIN}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Fazer login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary-600 to-primary-800 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-800/90"></div>

        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full"></div>

        <div className="relative z-10 max-w-md text-center">
          <div className="w-96 h-96 mx-auto mb-8 relative group cursor-pointer">
            <img
              src={mulherCadastro}
              alt="Profissional de saúde"
              className="w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-2xl"></div>
            <div className="absolute bottom-32 left-0 right-0 p-6 text-white transform transition-all duration-300 group-hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                Gestão Inteligente
              </h3>
              <p className="text-white/90 backdrop-blur-sm bg-white/10 p-3 rounded-lg shadow-lg">
                Simplifique o dia a dia da sua clínica com tecnologia de ponta
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
