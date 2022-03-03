## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
$ npm run typeorm:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migrations

$ npm run typeorm:run
$ npm run typeorm:generate -- migrationName

## ENV vars

- TYPEORM_CONNECTION = `postgres`
- TYPEORM_URL = `postgresql://username:password@localhost:port/databseName`
- TYPEORM_SYNCHRONIZE = `false`
- TYPEORM_LOGGING = `false`
- TYPEORM_ENTITIES = `entity/*.ts,src/**/*.entity.ts`
- TYPEORM_MIGRATIONS = `src/migrations/*.ts`
- TYPEORM_MIGRATIONS_DIR = `src/migrations`
