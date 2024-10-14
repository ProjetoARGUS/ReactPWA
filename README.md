# ARGUS - Aplicativo Recifense de Gestão Urbana e Social

**ARGUS** (Aplicativo Recifense de Gestão Urbana e Social) é uma plataforma de gestão condominial desenvolvida para conjuntos habitacionais da Prefeitura do Recife. O sistema centraliza a comunicação, gestão de regras, solicitações de manutenção, reservas de áreas comuns, e mais, visando melhorar a convivência e eficiência na gestão dos condomínios.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Licença](#licença)

## Visão Geral

**ARGUS** foi criado com a missão de facilitar a administração e melhorar a qualidade de vida em condomínios. A aplicação oferece funcionalidades como cadastro de usuários, comunicados, regras de convivência, solicitações de manutenção, votações online e reservas de áreas comuns. 

O projeto utiliza o framework **React** para a interface do usuário, combinando com **Progressive Web App (PWA)** para permitir que a aplicação funcione de maneira rápida, responsiva e offline, além de garantir uma experiência semelhante a um aplicativo nativo em dispositivos móveis. Com isso, os usuários podem acessar a plataforma com maior conveniência, independentemente da conexão com a internet.

Essa abordagem com PWA torna a aplicação ARGUS mais acessível e robusta, permitindo que os moradores e síndicos utilizem o sistema de forma contínua e eficiente.

## Funcionalidades

- **Cadastro e Login de Usuários**: Permite que moradores, conselheiros, representantes da prefeitura e síndicos façam cadastro e login na aplicação.
- **Sistema de Comunicados e Avisos**: Síndicos podem enviar avisos importantes para todos os moradores.
- **Regras Condominiais e Normas de Convivência**: Acesso fácil às regras do condomínio.
- **Solicitação de Manutenção**: Moradores podem solicitar e acompanhar manutenções em áreas comuns.
- **Gestão de Assembleias e Votação Online**: Participação em assembleias e votação em decisões importantes diretamente pelo app.
- **Sistema de Reservas de Áreas Comuns**: Reservas de espaços como salão de festas e churrasqueira de maneira organizada.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados em seu ambiente:

- [Node.js](https://nodejs.org/en/) (v14.x ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/ProjetoARGUS/ReactPWA.git
```

2. Navegue até o diretório do projeto:

```bash
cd ReactPWA
```

3. Instale as dependências do projeto:

Usando npm:
```bash
npm install
```

Ou usando yarn:
```bash
yarn install
```

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

### `npm start` ou `yarn start`

Executa a aplicação no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-la no navegador.

O aplicativo será recarregado automaticamente se você fizer edições no código.\
Você verá também quaisquer erros de lint no console.

### `npm test` ou `yarn test`

Executa os testes da aplicação no modo interativo de observação.\
Veja a seção sobre [testes](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `npm run build` ou `yarn build`

Constrói a aplicação para produção no diretório `build`.\
A aplicação será otimizada para o melhor desempenho.

### `npm run eject`

**Nota: essa operação é irreversível!**

Se você não estiver satisfeito com a configuração do build, pode "ejetar" a configuração. Isso copia todos os arquivos de configuração para o projeto, permitindo modificações diretas.

## Estrutura de Diretórios

Uma breve visão geral da estrutura do projeto:

```plaintext
├── public/               # Arquivos públicos estáticos
│   ├── vite.svg          # Logo Vite
│   └── ...
├── src/                  # Código fonte da aplicação
│   ├── assets/           # Componentes React reutilizáveis
│   ├── App.css           # Estilização da Página App
│   ├── App.jsx           # Estrutura da Página
│   ├── index.css         # Estilização raiz da aplicação
│   └── main.jsx          # Componente raiz da aplicação
├── .gitignore            # Define quais arquivos ou pastas não devem ser versionados no Git
├── LICENSE               # Licença do projeto, define os termos legais de uso e distribuição
├── README.md             # Instruções e informações gerais sobre o projeto
├── eslint.config.js      # Configurações do ESLint para manter a consistência de código
├── index.html            # Arquivo HTML principal da aplicação, ponto de entrada da estrutura do front-end
├── package.json          # Configurações e dependências do projeto, usadas pelo npm ou yarn
└── vite.config.js        # Configurações do Vite, ferramenta de build utilizada para desenvolvimento do projeto
```

## Licença

Este projeto está licenciado sob os termos da licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
