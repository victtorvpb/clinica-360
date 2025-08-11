# Sistema de Alertas - Clínica 360

Este projeto utiliza a biblioteca **react-toastify** para exibir notificações e alertas de forma consistente em toda a aplicação.

## Instalação

A biblioteca já está instalada no projeto:
```bash
npm install react-toastify
```

## Configuração

O sistema já está configurado no `App.tsx` com o `ToastContainer` e os estilos CSS importados.

## Como Usar

### 1. Hook Personalizado (Recomendado)

Use o hook `useAlert` para mostrar alertas em componentes React:

```tsx
import { useAlert } from '../hooks/useAlert';

const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo, showLoading, dismiss } = useAlert();

  const handleLogin = async () => {
    try {
      const loadingId = showLoading('Fazendo login...');
      
      // Sua lógica de login aqui
      await authService.login(credentials);
      
      dismiss(loadingId);
      showSuccess('Login realizado com sucesso!');
    } catch (error) {
      showError('Erro no login. Verifique suas credenciais.');
    }
  };

  return (
    <button onClick={handleLogin}>
      Fazer Login
    </button>
  );
};
```

### 2. Métodos Disponíveis

- `showSuccess(message, options?)` - Alerta de sucesso (verde)
- `showError(message, options?)` - Alerta de erro (vermelho)
- `showWarning(message, options?)` - Alerta de aviso (amarelo)
- `showInfo(message, options?)` - Alerta informativo (azul)
- `showLoading(message, options?)` - Alerta de carregamento
- `dismiss(toastId?)` - Fechar alerta específico ou todos

### 3. Opções Personalizadas

Você pode passar opções adicionais para customizar o comportamento:

```tsx
showError('Erro crítico!', {
  autoClose: 10000, // Fecha em 10 segundos
  position: 'top-center',
  theme: 'dark'
});
```

### 4. Em Serviços (Fora de Componentes)

Para usar em serviços ou funções utilitárias, use importação dinâmica:

```tsx
// Em um serviço
private showErrorAlert(message: string): void {
  import('react-toastify').then(({ toast }) => {
    toast.error(message);
  }).catch(() => {
    console.error(message); // Fallback
  });
}
```

## Exemplos Práticos

### Login com Alertas

```tsx
const handleLogin = async (credentials: LoginCredentials) => {
  const loadingId = showLoading('Autenticando...');
  
  try {
    await authService.login(credentials);
    dismiss(loadingId);
    showSuccess('Bem-vindo de volta!');
    // Redirecionar para dashboard
  } catch (error) {
    dismiss(loadingId);
    showError('Email ou senha incorretos. Tente novamente.');
  }
};
```

### Operações CRUD

```tsx
const handleSave = async (data: any) => {
  try {
    await api.save(data);
    showSuccess('Dados salvos com sucesso!');
  } catch (error) {
    showError('Erro ao salvar dados. Tente novamente.');
  }
};

const handleDelete = async (id: number) => {
  try {
    await api.delete(id);
    showSuccess('Item excluído com sucesso!');
  } catch (error) {
    showError('Erro ao excluir item. Tente novamente.');
  }
};
```

### Validações

```tsx
const validateForm = (data: any) => {
  if (!data.email) {
    showError('Email é obrigatório');
    return false;
  }
  
  if (!data.password) {
    showError('Senha é obrigatória');
    return false;
  }
  
  return true;
};
```

## Configuração Global

As configurações padrão estão no hook `useAlert`:

- **Posição**: Top-right
- **Auto-close**: 5 segundos
- **Tema**: Light
- **Progress bar**: Visível
- **Clique para fechar**: Habilitado
- **Pausar no hover**: Habilitado
- **Arrastável**: Habilitado

## Personalização de Estilos

Para customizar os estilos, você pode:

1. Sobrescrever as classes CSS do react-toastify
2. Usar o tema dark: `theme: 'dark'`
3. Passar opções customizadas em cada chamada

## Boas Práticas

1. **Sempre trate erros** com alertas apropriados
2. **Use loading** para operações assíncronas
3. **Mantenha mensagens claras** e acionáveis
4. **Não abuse** - use alertas apenas quando necessário
5. **Considere acessibilidade** - mensagens devem ser compreensíveis

## Exemplo Completo

Veja o arquivo `src/components/AlertExample.tsx` para um exemplo completo de uso de todos os tipos de alertas.
