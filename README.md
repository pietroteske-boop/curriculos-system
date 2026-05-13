# Sistema de Gestão de Currículos

Aplicação web construída com Next.js, TypeScript e Tailwind CSS para cadastrar, listar e visualizar currículos de forma intuitiva e responsiva.

##  Visão geral

O projeto oferece uma experiência simples para gerenciar currículos, incluindo captura de dados por formulário e visualização dos registros cadastrados. O sistema também utiliza validação de formulários para garantir que o usuário informe os dados corretamente.

##  Funcionalidades

- Cadastro de currículos com campos essenciais
- Exibição de lista de currículos cadastrados
- Visualização de detalhes por currículo
- Validação de formulário com mensagens de erro claras
- Layout responsivo para desktop e mobile
- Componentes reutilizáveis usando Tailwind CSS

##  Tecnologias

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Hook Form
- Yup
- Lucide React
- Sonner (notificações)
- React Icons

##  Estrutura do projeto

- `app/` — rotas e páginas do Next.js
- `components/` — componentes UI reutilizáveis
- `lib/` — lógica de dados e helpers
- `public/` — arquivos estáticos
- `types/` — definições de tipos TypeScript

##  Instalação e execução

```bash
npm install
npm run dev
```

Em seguida, abra `http://localhost:3000` no navegador.

##  Scripts disponíveis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera a versão de produção
- `npm run start` — executa a versão compilada
- `npm run lint` — analisa o código com ESLint

##  Próximos passos

Possíveis melhorias futuras:

- Persistência em banco de dados
- Autenticação de usuários
- Filtros e pesquisa de currículos
- Exportação para PDF
