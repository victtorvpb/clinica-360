# Clínica 360 - Sistema de Gestão

Um sistema completo de gestão para clínicas médicas desenvolvido com React, TypeScript e Vite.

## 🚀 Funcionalidades

- **Dashboard**: Visão geral da clínica com estatísticas e ações rápidas
- **Gestão de Pacientes**: Cadastro, busca e edição de pacientes
- **Agendamentos**: Sistema completo de agendamento de consultas
- **Equipe Médica**: Gerenciamento de médicos e especialidades
- **Consultas**: Registro e histórico de consultas realizadas
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile

## 🛠️ Tecnologias Utilizadas

- **React 18**: Biblioteca para construção da interface
- **TypeScript**: Tipagem estática para maior segurança
- **Vite**: Build tool rápida e moderna
- **Tailwind CSS**: Framework CSS para estilização
- **React Router**: Navegação entre páginas
- **Lucide React**: Ícones modernos e bonitos
- **Date-fns**: Manipulação de datas

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd clinica-360
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:3000
```

## 🏗️ Build para Produção

Para gerar a build de produção:

```bash
npm run build
```

Para visualizar a build localmente:

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── Layout.tsx      # Layout principal com navegação
├── pages/              # Páginas da aplicação
│   ├── Dashboard.tsx   # Dashboard principal
│   ├── Pacientes.tsx   # Gestão de pacientes
│   ├── Agendamentos.tsx # Sistema de agendamentos
│   ├── Medicos.tsx     # Gestão de médicos
│   └── Consultas.tsx   # Registro de consultas
├── types/              # Definições de tipos TypeScript
│   └── index.ts        # Interfaces principais
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🎨 Design System

O projeto utiliza um design system consistente baseado em:

- **Cores primárias**: Azul (#3b82f6) para elementos principais
- **Cores médicas**: Verde (#22c55e) para elementos relacionados à saúde
- **Tipografia**: Sistema de fontes nativo do sistema
- **Espaçamentos**: Grid baseado em múltiplos de 4px
- **Componentes**: Cards, botões e formulários padronizados

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona bem em:

- **Desktop**: Layout com sidebar expandida
- **Tablet**: Layout adaptado com navegação colapsível
- **Mobile**: Menu hambúrguer e layouts otimizados

## 🔧 Scripts Disponíveis

- `npm run dev`: Executa em modo de desenvolvimento
- `npm run build`: Gera build de produção
- `npm run preview`: Visualiza a build localmente
- `npm run lint`: Executa o linter

## 🚧 Próximas Funcionalidades

- [ ] Sistema de autenticação
- [ ] Integração com API backend
- [ ] Relatórios e gráficos
- [ ] Sistema de notificações
- [ ] Backup e exportação de dados
- [ ] Integração com prontuário eletrônico

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas, entre em contato através de:
- Email: suporte@clinica360.com
- GitHub Issues: [Criar nova issue](https://github.com/usuario/clinica-360/issues)

---

Desenvolvido com ❤️ para modernizar a gestão de clínicas médicas. 
