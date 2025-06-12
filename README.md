# Aplicação Web para cadastro de pensamentos - Toughts 🧠💡

O projeto toughts é uma aplicação web baseada em um padrão de arquitetura MVC que desenvolvi durante o curso "Node.js do Zero a Maestria com diversos Projetos" com o instrutor Matheus Battisti na Udemy durante o período de estágio que realizei na CompassUOL.

Alguns meses após a finalização do projeto eu utilizei o repositório que já estava pronto para realizar uma tarefa de CI/CD da disciplina de integração e entrega continua da faculdade de Desenvolvimento de Software Multiplataforma, para isso houveram alterações para o projeto utilizar redis e containers docker para funcionar.

## ⚙️ Funcionalidades

### Funcionalidades Principais

- **Cadastro e Autenticação de Usuários**: Os usuários podem se registrar e realizar login. As senhas são criptografadas utilizando `bcryptjs` para garantir segurança.
- **Criação e Gerenciamento de Pensamentos**: Usuários autenticados podem cadastrar, visualizar, editar e deletar pensamentos, que são armazenados no banco de dados e associados a cada usuário.
- **Visualização Pública de Pensamentos**: A aplicação permite que qualquer visitante veja os pensamentos públicos cadastrados.
- **Sistema de Sessão com Redis**: Sessões de usuário são gerenciadas com `express-session` e armazenadas no Redis para melhorar desempenho e persistência.
- **Renderização com Handlebars**: A interface da aplicação é construída com `express-handlebars`, oferecendo páginas dinâmicas com base no estado do usuário.
- **Flash Messages e Validação de Sessões**: Feedbacks de ações (como sucesso ou erro) são exibidos com `connect-flash`, e o sistema garante que apenas usuários logados possam acessar rotas protegidas.

### Funcionalidades Técnicas

- Manipulação de banco de dados com **Sequelize** e **MySQL**
- Sistema de autenticação com **bcryptjs** para hashing de senhas
- Gerenciamento de sessões com **express-session** e armazenamento com **Redis** (`connect-redis`)
- Middleware de controle de autenticação de usuários e sessões
- Renderização de páginas com **express-handlebars**
- Utilização de **dotenv** para gerenciamento de variáveis de ambiente
- Arquitetura organizada em **MVC** (Model-View-Controller)
- Suporte a execução em containers com **Docker** (aplicação + Redis)
- Suporte a criação de imagem da aplicação com **Dockerfile**
- Código modular e pronto para CI/CD em servidor remoto

---

## 🧪 Stack Tecnológica

- **Linguagem**: JavaScript (Node.js)
- **Framework Web**: Express
- **Banco de Dados**: MySQL
- **ORM**: Sequelize
- **Template Engine**: Handlebars
- **Gerenciamento de Sessão**: Redis + connect-redis
- **Autenticação**: bcryptjs
- **Containers**: Docker + Dockerfile
- **Gerenciamento de Variáveis**: dotenv

## ⚠️ Pré-requisitos

- Node.js (v22 ou superior)
- Docker

## 🛠️ Instalação (Com containers docker)

1. Clone o repositório:

```bash
git clone <repository-url>
cd smartlocker-backend-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configuração do Ambiente: Crie o arquivo .env na RAIZ do projeto com suas credenciais para a aplicação seguindo o seguinte formato:

```bash
MYSQL_USER=root
MYSQL_PASSWORD=suasenha
MYSQL_DB=toughts2
SESSION_SECRET=seusecret
REDIS_URL=redis://nome-do-seu-container-redis:6379
PORT=8123
MYSQL_HOST=mysql
```

4. Inicie manualmente os containers para a aplicação **(Altere o nome dos containers para o nome que desejar, mas note que no do mysql você deve modificar a propriedade host no arquivo connection.js na pasta db para o mesmo nome do container que você criar)**:

```bash
#1 Criar rede Docker personalizada
docker network create guuiisouza-toughts

#2 Criar container mysql
docker run --name guuiisouza-toughts-mysql --network guuiisouza-toughts -p 8124:3306 -e MYSQL_ROOT_PASSWORD=suasenha -e MYSQL_DATABASE=toughts2 -v guuiisouza-toughts-mysql-data:/var/lib/mysql -d mysql:8.0

#3 Criar container redis
docker run --name guuiisouza-toughts-redis --network guuiisouza-toughts -p 8125:6379 -v guuiisouza-toughts-redis-data:/data -d redis:7-alpine
```

5. Após realizar todos os passos anteriores inicie a aplicação com:

```bash
npm start
```

## 📐 Arquitetura

### Esquema do Banco de Dados

#### Tabela users

- id (int)
- name (string)
- email (string, único)
- password (string)

#### Tabela toughts

- id (int)
- title (string)
