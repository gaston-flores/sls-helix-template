# Serverless + GraphQL Helix Template

A simple template for Serverless GraphQL projects.

**Includes**

- [Serverless Framework](https://www.serverless.com/framework/docs)
- [serverless-offline](https://www.serverless.com/plugins/serverless-offline)
- TypeScript support (through [serverless-esbuild](https://www.serverless.com/plugins/serverless-esbuild))
- [GraphQL Helix](https://github.com/contra/graphql-helix)

## Usage

### Installation

```bash
yarn install
```

### Running locally

```bash
yarn start
```

Open http://localhost:3000/graphql in a browser to use the GraphiQL interface. Run GraphQL queries against the same endpoint:

```sh
curl --location --request POST 'http://localhost:3000/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query {\n  hello\n}","variables":{}}'
```

### Deployment

Configure your AWS credentials and run:

```
yarn deploy
```
