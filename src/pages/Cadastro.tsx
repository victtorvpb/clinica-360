import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import mulherCadastro from "../assets/images/mulher-cadastro.jpg";

export function Cadastro() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    clinicName: "",
    teamSize: "",
    area: "",
    specialization: "",
    name: "",
    phone: "",
    email: "",
  });

  const totalSteps = 3;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit final form
      console.log("Dados do formulário:", formData);
      // Aqui você implementaria a lógica de cadastro
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Conte-nos sobre sua clínica";
      case 2:
        return "Finalize seu cadastro";
      case 3:
        return "Crie sua conta e teste grátis por 3 dias! 🥰";
      default:
        return "";
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return "Vamos personalizar a experiência para sua clínica.";
      case 2:
        return "Apenas mais alguns dados para começar.";
      case 3:
        return "Configure seu teste grátis em menos de 2 minutos.";
      default:
        return "";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Nome da clínica */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da sua clínica
              </label>
              <input
                type="text"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                placeholder="Nome fantasia"
                required
              />
            </div>

            {/* Quantas pessoas trabalham */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantas pessoas trabalham na sua clínica?
              </label>
              <select
                name="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors bg-white"
                required
              >
                <option value="">Selecione</option>
                <option value="1">Só eu</option>
                <option value="2-5">De 2 a 5 pessoas</option>
                <option value="6-10">De 6 a 10 pessoas</option>
                <option value="11-20">De 11 a 20 pessoas</option>
                <option value="20+">Mais de 20 pessoas</option>
              </select>
            </div>

            {/* Área de atuação */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qual sua área de atuação?
              </label>
              <select
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors bg-white"
                required
              >
                <option value="">Selecione</option>
                <option value="estetica">Estética</option>
                <option value="dermatologia">Dermatologia</option>
                <option value="clinica-geral">Clínica Geral</option>
                <option value="odontologia">Odontologia</option>
                <option value="fisioterapia">Fisioterapia</option>
                <option value="psicologia">Psicologia</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            {/* Especialização (condicional) */}
            {formData.area === "estetica" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qual sua área de especialização dentro da Estética?
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors bg-white"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="facial">Estética Facial</option>
                  <option value="corporal">Estética Corporal</option>
                  <option value="ambas">Facial e Corporal</option>
                  <option value="micropigmentacao">Micropigmentação</option>
                  <option value="laserterapia">Laserterapia</option>
                </select>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu nome
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                placeholder="Nome e sobrenome"
                required
              />
            </div>

            {/* Celular */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Celular
              </label>
              <div className="flex">
                <div className="flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                  <span className="text-sm">🇧🇷</span>
                  <span className="ml-1 text-sm text-gray-600">+55</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                  placeholder="(99) 9999-9999"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu e-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                placeholder="nome@dominio.com"
                required
              />
            </div>

            {/* Termos */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                Li e aceito os{" "}
                <a href="#" className="text-primary-600 hover:underline">
                  termos, condições de uso e política de privacidade
                </a>
              </label>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Defina uma senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                  placeholder="Senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                A senha deve ter 8 caracteres ou mais
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Imagem e background */}
      <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden shadow-2xl">
        {/* Formas geométricas decorativas */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500 rounded-full opacity-80 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-400 rounded-full opacity-70"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-600 rounded-full opacity-60"></div>
        </div>

        {/* Imagem da mulher trabalhando */}
        <div className="relative z-10 w-full h-full group cursor-pointer">
          <img
            src={mulherCadastro}
            alt="Mulher trabalhando"
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 shadow-2xl"
          />

          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Overlay com texto */}
          <div className="absolute bottom-32 left-8 right-8 transform translate-y-0 group-hover:-translate-y-4 transition-transform duration-500">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Transforme sua clínica
              </h2>
              <p className="text-gray-600">
                Gestão completa e moderna para profissionais da saúde
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo e cabeçalho */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-semibold text-gray-700">
                clinica
              </span>
              <span className="text-xl font-bold text-primary-600">
                experts
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {getStepTitle()}
            </h1>
            <p className="text-gray-600">{getStepSubtitle()}</p>
          </div>

          {/* Indicador de progresso */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full ${
                    step === currentStep
                      ? "bg-primary-600"
                      : step < currentStep
                      ? "bg-primary-400"
                      : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleNextStep} className="space-y-6">
            {/* Conteúdo dinâmico baseado no step */}
            {renderStepContent()}

            {/* Navegação entre steps */}
            <div className="space-y-4">
              {/* Botões de navegação */}
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    Voltar
                  </button>
                )}
                <button
                  type="submit"
                  className={`${
                    currentStep > 1 ? "flex-1" : "w-full"
                  } bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors`}
                >
                  {currentStep === totalSteps
                    ? "Criar minha conta"
                    : "Continuar"}
                </button>
              </div>

              {/* Link para login - apenas no último step */}
              {currentStep === totalSteps && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Já possui uma conta?{" "}
                    <a href="#" className="text-primary-600 hover:underline">
                      Entre aqui
                    </a>{" "}
                    ou{" "}
                    <a href="#" className="text-primary-600 hover:underline">
                      recupere sua senha
                    </a>
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
