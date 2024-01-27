![Logo do projeto](https://raw.githubusercontent.com/oMatheus-Farias/appdentalsupport/main/public/images/mockup-DentalSupport.png)

# DentalSupport

O Dental Support é uma plataforma digital dedicada aos serviços odontológicos, proporcionando uma abordagem abrangente tanto para profissionais de saúde bucal quanto para pacientes. Com uma interface intuitiva e funcionalidades específicas para ambos os públicos, a plataforma visa simplificar o agendamento de consultas, melhorar a gestão de clínicas odontológicas e oferecer uma experiência aprimorada aos usuários.

## 🔥 Funcionalidades Principais

- **API Segura com NodeJS:** Uma API robusta foi desenvolvida em NodeJS para gerenciar as requisições da aplicação, garantindo eficiência e segurança.
- **Páginas de Login e Cadastro:** Duas telas de login e duas telas para cadastro, uma destinada a pessoas físicas (pacientes) e outra a pessoas jurídicas (profissionais/clinicas). Utilização de React Hook Form, resolvers e Zod para validação eficiente dos formulários.

### Área do Paciente (Pessoa Física)
  
- **Tela de Consultas:** Exibição das consultas marcadas em cards detalhados. Modal com informações detalhadas e opção para cancelamento.
- **Página de Marcar Consulta:** Formulário intuitivo para agendamento de novas consultas.
- **Perfil do Paciente:** Atualização de foto, nome e contato. Botão para realizar logout da conta.

### Área do Profissional (Pessoa Jurídica)
  
- **Tela de Agenda:** Visualização de todos os serviços marcados pelos pacientes. Modal com detalhes da consulta e informações do paciente. Opção para cancelamento de consultas.
- **Perfil Profissional:** Edição de nome, localização e contato. Salvamento de alterações e opção para logout.
  
### ⚙️ Pré-requisitos

- npm ou yarn

### 🔨 Guia de instalação

1. Clone o repositório: `git clone https://github.com/oMatheus-Farias/appdentalsupport.git`>
2. Navegue até o diretório do projeto: `cd appdentalsupport`
3. Instale as dependências: `npm install` (ou use o gerenciador de pacotes apropriado)
4. Inicie o servidor: `npm run dev` (ou use o comando adequado)
5. O aplicativo estará disponível no localhost que aparecera no seu painel ex: [http://localhost:3000](http://localhost:3000/)

### Desenvolvimento

Banco de Dados:

Mapeamento do banco utilizando a ferramenta Whimsical.
PostgreSQL como banco de dados e Prisma ORM para criação das tabelas.

Protótipo de Design:

Desenvolvimento do protótipo no Figma para garantir a usabilidade e a estética.

API e Testes:

Implementação da API com Node.js.
Testes de rotas realizados com o Insomnia.

Front-End:

Desenvolvido com Next.js, React.js, TypeScript, TailwindCSS e CSS.
Utilização da Context API e React Hook Form para gerenciamento de estados e formulários.

Controle de Versão:

Git e GitHub para o controle eficiente das versões do projeto.

Ferramentas Adicionais:

Beekeeper Studio para visualização das tabelas do banco de dados.
Insomnia para testes de rotas.

O Dental Support é resultado de uma abordagem integrada, desde a concepção do banco de dados até o desenvolvimento do front-end, utilizando tecnologias modernas e eficientes para proporcionar uma solução completa e intuitiva no cenário odontológico.

### 📦 Tecnologias usadas

* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
* ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
* ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)


### 📄 Licença

Este projeto está sob a [Licença MIT](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)
