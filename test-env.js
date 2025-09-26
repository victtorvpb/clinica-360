// Script para testar se as variáveis de ambiente estão funcionando
console.log('🔍 Testando variáveis de ambiente...');
console.log('VITE_API_URL:', process.env.VITE_API_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Simular o que o Vite faz
const viteEnv = {
  VITE_API_URL: process.env.VITE_API_URL || 'http://localhost:8000'
};

console.log('📡 URL da API configurada:', viteEnv.VITE_API_URL);
console.log('✅ Teste concluído!');
