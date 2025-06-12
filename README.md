# NutriFácil 🍎

## Sobre o Projeto

NutriFácil é uma plataforma web desenvolvida para auxiliar nutricionistas e clínicas no atendimento de teleconsultas. A aplicação oferece ferramentas essenciais para o acompanhamento nutricional remoto, permitindo um atendimento eficiente e personalizado.

## Funcionalidades Principais

- 📋 Cadastro e gerenciamento de dietas personalizadas
- 📊 Calculadora de IMC (Índice de Massa Corporal)
- 💧 Calculadora de ingestão diária de água
- 🔥 Calculadora de TMB (Taxa Metabólica Basal)
- 👤 Sistema de autenticação de usuários
- 📱 Interface responsiva e intuitiva

## Tecnologias Utilizadas

### Frontend
- React.js
- React Router DOM (v6)
- Bootstrap 5
- Context API para gerenciamento de estado
- Zod para validação de formulários

### Backend
- Node.js
- Express.js
- SQLite para banco de dados
- Cors para segurança

### Ferramentas de Desenvolvimento
- Vite
- ESLint
- Prettier
- Git para controle de versão

## Pré-requisitos

- Node.js (versão 20 ou superior)
- npm

## Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/nutri-facil-app.git
```

2. Instale as dependências do frontend
```bash
cd frontend
npm install
```

3. Instale as dependências do backend
```bash
cd backend
npm install
```

4. Inicie o servidor de desenvolvimento

```bash
# Backend
npm run dev

# Frontend (em outro terminal)
npm run dev
```

## Estrutura do Projeto

```
nutri-facil-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── index.js
    └── package.json
```

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.