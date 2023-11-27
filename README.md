# Delice.ry (Backend)

### Descrição

**Delice.ry** é uma aplicação de delivery para restaurantes e lanchonetes que buscar facilitar o gerenciamento de pedidos e compras.

Com um painel dedicado de gerenciamento, o administrador é capaz de visualizar os pedidos em tempo real e alterar o estado do mesmo, assim mantendo o cliente atualizado do progresso da sua compra. Também é possível criar cardápios facilmente e alterar seu status informando se está disponível para compra.

Com um sistema de pagamento integrado, o cliente não necessita sair da plataforma para efetuar o pagamento da sua compra, podendo utilizar cartão de crédito ou débito.

### Motivação

Faz um tempo que eu estava querendo criar um projeto que me desafiasse a aprender coisas novas e pudesse ser usado no mundo real, então dessa motivação surgiu a ideia do **Delice.ry**.

### Aprendizado ✍️

- **Gateway de pagamento**

  Fiz integração com a API do Mercado Pago para cobranças no cartão. Para saber mais sobre, clique [aqui](https://www.mercadopago.com.br/developers/pt) para conferir a documentação oficial.

- **Docker**

  Eu já tinha noção de como se usar o básico de Docker, mas até então eu não havia criado nada que aplicasse esse conhecimento para algo útil de verdade.

- **CI/CD**

  Aqui também eu já tinha uma certa noção, mas sem aplicabilidade em projetos.

### Features e tecnologias 🖥️

- **NestJS** como framework backend
- **Prisma** como ORM
- **Docker**
- **CI/CD**
- **Swagger**
- **Mercado Pago** como Gateway de pagamento
- **Websocket**
- **Autenticação e autorização**
- **Roles** para controle de níveis de privilégio

## Setup

### Requisitos

Ter o **Docker Desktop** ou **Docker Engine** com **Docker Compose**

### Buildando e executando

```bash
$ docker compose up --build
```

## Como testar

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
