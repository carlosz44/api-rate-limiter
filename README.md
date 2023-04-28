# API Rate Limiter

API project built with Node.js, Express and Typescript.

## Features

1. Typescript integration.
2. Configurable rate limiting via [Redis](https://redis.io/).
3. Request payload filtering for removing all `null` or `undefined` values.
4. Unit tests with [Jest](https://jestjs.io/).
5. .env files for setting up environment variables.
6. Request and error logging with [Morgan](https://github.com/expressjs/morgan) and [Winston](https://github.com/winstonjs/winston).

## npm scripts

Use `npm run dev` to run the app in development mode and restart the app on file changes thanks to Nodemon.

Use `npm run build` to compile all the `.ts` files in the `dist/` folder.

Use `npm run test` to run the unit tests configured with Jest including coverage.

Use `npm run start` to run the application.

## Running as Standalone

To run the app standalone follow the [Redis installation guide](https://redis.io/docs/getting-started/installation/) and start the service, set the envinment variables `CONNECTIONS_LIMIT` and `LIMIT_DURATION_IN_SECONDS` using the `.env.example` file, then run:

```bash
npm install
```

```bash
npm run dev
```

## Testing API calls

Once you have the project running, you can test the `localhost:3000/api` endpoint using Postman or Insomnia.
