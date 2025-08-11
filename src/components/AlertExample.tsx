import React from 'react';
import { useAlert } from '../hooks/useAlert';

export const AlertExample: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo, showLoading, dismiss } = useAlert();

  const handleLoginError = () => {
    showError('Erro no login. Verifique suas credenciais e tente novamente.');
  };

  const handleLoginSuccess = () => {
    showSuccess('Login realizado com sucesso!');
  };

  const handleWarning = () => {
    showWarning('Atenção: Esta ação não pode ser desfeita.');
  };

  const handleInfo = () => {
    showInfo('Informação: Sua sessão expirará em 5 minutos.');
  };

  const handleLoading = () => {
    const toastId = showLoading('Carregando dados...');
    
    // Simular uma operação assíncrona
    setTimeout(() => {
      dismiss(toastId);
      showSuccess('Dados carregados com sucesso!');
    }, 3000);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Exemplos de Alertas</h2>
      
      <div className="space-y-2">
        <button
          onClick={handleLoginError}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Mostrar Erro
        </button>
        
        <button
          onClick={handleLoginSuccess}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
        >
          Mostrar Sucesso
        </button>
        
        <button
          onClick={handleWarning}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2"
        >
          Mostrar Aviso
        </button>
        
        <button
          onClick={handleInfo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
        >
          Mostrar Info
        </button>
        
        <button
          onClick={handleLoading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 ml-2"
        >
          Mostrar Loading
        </button>
      </div>
    </div>
  );
};
