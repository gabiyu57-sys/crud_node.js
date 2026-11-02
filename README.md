# crud_node.js
# CRUD de Leads - Clínica de Psicologia

## Sobre o projeto

Este projeto é um sistema CRUD desenvolvido em **Node.js** para auxiliar uma clínica de psicologia no gerenciamento de seus leads.

Leads são pessoas que demonstraram interesse nos serviços oferecidos pela clínica e que podem se tornar pacientes.

O sistema possui uma interface web que permite cadastrar, visualizar, editar, pesquisar e excluir leads.

## Objetivo do projeto

O objetivo é facilitar o gerenciamento dos possíveis pacientes da clínica, organizando suas informações em um único lugar e permitindo acompanhar o andamento de cada contato.

## Funcionalidades

- Cadastrar novos leads.
- Visualizar todos os leads cadastrados.
- Editar informações dos leads.
- Excluir leads.
- Pesquisar leads por nome, telefone, e-mail ou status.
- Identificar leads ativos e inativos.
- Informar se o lead comprou um pacote.
- Visualizar indicadores no painel:
  - Total de leads.
  - Leads ativos.
  - Leads que compraram pacotes.

## Tecnologias utilizadas

- **Node.js** – Ambiente de execução JavaScript.
- **Express** – Framework para criação da API.
- **MySQL** – Banco de dados.
- **HTML5** – Estrutura da página.
- **CSS3** – Estilização da interface.
- **JavaScript** – Funcionalidades e comunicação com a API.
- **mysql2** – Conexão entre Node.js e MySQL.
- **dotenv** – Gerenciamento de variáveis de ambiente.
- **cors** – Configuração de compartilhamento de recursos.

## Estrutura do projeto

```text
crud_node.js/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── routes/
│   └── leads.js
│
├── conexao.js
├── server.js
├── .env
├── package.json
└── README.md
```

## Banco de dados

O projeto utiliza o MySQL com o banco de dados chamado `crud_clinica`.

A tabela principal é `leads`, que armazena as seguintes informações:

| Campo | Descrição |
|---|---|
| id | Identificador do lead |
| nome | Nome do lead |
| telefone | Telefone para contato |
| email | E-mail do lead |
| status | Situação do lead |
| ativo | Indica se o lead está ativo |
| comprou_pacote | Indica se comprou um pacote |
| data_cadastro | Data de cadastro |

## Como executar o projeto

### 1. Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- Node.js
- MySQL
- Visual Studio Code

### 2. Instalar as dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

### 3. Configurar o banco de dados

Crie o banco de dados `crud_clinica` no MySQL e configure a conexão no arquivo `conexao.js` ou nas variáveis de ambiente do arquivo `.env`.

### 4. Iniciar o servidor

No terminal, execute:

```bash
node server.js
```

Se estiver tudo certo, aparecerá:

```text
MySQL conectado com sucesso!
Servidor rodando em http://localhost:3000
```

### 5. Acessar o sistema

Abra o navegador e acesse:

http://localhost:3000

## Rotas da API

| Método | Rota | Função |
|---|---|---|
| GET | /leads | Listar todos os leads |
| GET | /leads/:id | Buscar um lead específico |
| POST | /leads | Cadastrar um lead |
| PUT | /leads/:id | Atualizar um lead |
| DELETE | /leads/:id | Excluir um lead |

## Considerações finais

O desenvolvimento deste projeto permitiu colocar em prática conhecimentos de desenvolvimento web, criação de APIs, operações CRUD e integração com banco de dados MySQL.

O sistema foi desenvolvido com o objetivo de tornar o gerenciamento de leads de uma clínica de psicologia mais simples, organizado e eficiente.