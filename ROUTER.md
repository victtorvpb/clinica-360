# 🚀 Sistema de Rotas - Clínica 360

## 📋 Visão Geral

O sistema de rotas foi completamente refatorado para ser mais robusto, escalável e fácil de manter.

## 🏗️ Arquitetura

### **Estrutura de Arquivos:**
```
src/
  router/
    ├── index.tsx          # Configuração principal das rotas
    └── routes.ts          # Constantes das rotas
  hooks/
    └── useNavigation.ts   # Hook customizado para navegação
  components/
    ├── Layout.tsx         # Layout com Outlet para rotas aninhadas
    └── ErrorBoundary.tsx  # Tratamento de erros
```

---

## 🎯 Principais Vantagens

### ✅ **Lazy Loading**
- Páginas carregadas apenas quando necessário
- Melhor performance inicial
- Loading automático entre páginas

### ✅ **Type Safety**
- Constantes tipadas para todas as rotas
- Validação em tempo de compilação
- Autocompletar nas IDEs

### ✅ **Centralização**
- Todas as rotas em um local
- Fácil manutenção
- Consistência garantida

### ✅ **Error Handling**
- Página 404 customizada
- Tratamento de erros por página
- Recuperação automática

---

## 🔧 Como Usar

### **1. Navegação com Hook Customizado**

```tsx
import { useNavigation } from "../hooks/useNavigation";

function MeuComponente() {
  const nav = useNavigation();
  
  return (
    <div>
      {/* Usando atalhos */}
      <button onClick={nav.goToDashboard}>Dashboard</button>
      <button onClick={nav.goToPacientes}>Pacientes</button>
      
      {/* Usando constantes */}
      <button onClick={() => nav.goTo("AGENDAMENTOS")}>
        Agendamentos
      </button>
      
      {/* Navegação programática */}
      <button onClick={nav.goBack}>Voltar</button>
    </div>
  );
}
```

### **2. Links com Constantes**

```tsx
import { Link } from "react-router-dom";
import { ROUTES } from "../router/routes";

function Menu() {
  return (
    <nav>
      <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
      <Link to={ROUTES.PACIENTES}>Pacientes</Link>
      <Link to={ROUTES.CONSULTAS}>Consultas</Link>
    </nav>
  );
}
```

### **3. Validação de Rotas**

```tsx
import { isValidRoute } from "../router/routes";

function verificarRota(path: string) {
  if (isValidRoute(path)) {
    console.log("Rota válida:", path);
  } else {
    console.log("Rota inválida:", path);
  }
}
```

---

## 📝 Constantes de Rotas

```typescript
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  CADASTRO: "/cadastro", 
  PACIENTES: "/pacientes",
  AGENDAMENTOS: "/agendamentos",
  MEDICOS: "/medicos",
  CONSULTAS: "/consultas",
} as const;
```

---

## 🛡️ Proteção de Rotas (Futuro)

O sistema está preparado para adicionar proteção de rotas:

```tsx
// Exemplo futuro de rota protegida
{
  path: "admin",
  element: (
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  ),
}
```

---

## 🔄 Adicionando Novas Rotas

### **1. Adicionar na constante:**
```typescript
// src/router/routes.ts
export const ROUTES = {
  // ... rotas existentes
  NOVA_ROTA: "/nova-rota",
} as const;
```

### **2. Adicionar no router:**
```tsx
// src/router/index.tsx
{
  path: "nova-rota",
  element: (
    <PageWrapper>
      <NovaPageComponent />
    </PageWrapper>
  ),
}
```

### **3. Adicionar atalho (opcional):**
```tsx
// src/hooks/useNavigation.ts
return {
  // ... métodos existentes
  goToNovaRota: () => goTo("NOVA_ROTA"),
};
```

---

## 🚀 Performance

### **Lazy Loading Implementado:**
- ✅ Dashboard
- ✅ Pacientes  
- ✅ Agendamentos
- ✅ Médicos
- ✅ Consultas
- ✅ Cadastro

### **Loading States:**
- Spinner automático durante carregamento
- Fallback customizado para cada página
- Transições suaves

---

## 🧪 Testando Rotas

```bash
# Testar se build funciona com lazy loading
npm run build

# Verificar se todas as rotas funcionam
npm run dev
```

**URLs para testar:**
- `http://localhost:5173/` → Redireciona para dashboard
- `http://localhost:5173/dashboard` → Dashboard
- `http://localhost:5173/cadastro` → Cadastro (sem layout)
- `http://localhost:5173/pacientes` → Pacientes
- `http://localhost:5173/rota-inexistente` → Página 404

---

## 💡 Dicas

1. **Sempre use constantes** em vez de strings hardcoded
2. **Use o hook customizado** para navegação programática
3. **Teste lazy loading** em produção para garantir performance
4. **Adicione novas rotas** seguindo o padrão estabelecido 
