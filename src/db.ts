import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../database/migrations/schema.js';
import * as relations from '../database/migrations/relations.js';
import { IS_DEV } from './env.js';

export const connectionString =
    process.env.DATABASE_CONNECTION_STRING ||
    'postgresql://postgres:postgres@localhost:5432/postgres';
export const databaseMap = {
    ...schema,
    ...relations,
};

export const db = drizzle(postgres(connectionString), {
    schema: databaseMap,
    logger: IS_DEV,
});
