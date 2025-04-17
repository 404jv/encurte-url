# 🚀 Como rodar o projeto

## 1. Configurar variáveis de ambiente

Copie o arquivo `.env.example` e crie o `.env`:

```bash
cp .env.example .env
```

### 🧪 Variáveis de ambiente usadas

```env
# Conexão com o banco de dados
DATABASE_URL=postgres://docker:secret123@localhost:5432/encurte-url
POSTGRES_USER=docker
POSTGRES_PASSWORD=secret123
POSTGRES_DB=encurte-url

# Token JWT
JWT_SECRET=secret

# URL base do encurtador (usada para gerar os links encurtados)
BASE_URL=http://localhost:3000
```

---

## 2. Usar a versão do NodeJS recomendada `v20.19.0`

```
nvm use
```

---

## 3. Instalar as dependências

```bash
npm install
```

---

## 4. Iniciar a aplicação

```bash
npm start
```

Isso irá levantar os serviços e rodar a aplicação em `http://localhost:3000`.

---

## 5. Rodar os testes (não precisa do passo anterior)

A aplicação foi construída com **TDD**, então todas as funcionalidades e regras de negócio estão cobertas por testes automatizados. Para executá-los:

```bash
npm test
```

## Para manipular o container pode usar os scripts:

```bash
npm run services:up # sobe o container
npm run services:down # derruba o container
npm run services:stop # para o container
```

---

## Pontos de melhorias

- Autenticação com algoritmo `RS256`;
- Criação de um arquivo para levantar o banco com um novo schema e depois derrubar o mesmo para cada rodada de teste;
- Utilizar o `JwtEncrypter` por meio de injeção de dependência ao invés de usar `JwtService` diretamente na autenticação (deu um erro que não dá tempo de resolver);
- Melhoria do Continues Integration no GitHub para validar obrigatoriamente o lint, testes e commits;
