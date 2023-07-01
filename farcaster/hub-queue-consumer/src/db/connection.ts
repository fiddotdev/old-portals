import {Kysely, PostgresDialect} from 'kysely';
import {OrionDB} from '@portals/database-manager';
import {Pool} from 'pg';
import {env} from '../utils/envsafe';

const db = new Kysely<OrionDB>({
    dialect: new PostgresDialect({
        pool: new Pool({
            host: env.POSTGRES_HOST,
            user: env.POSTGRES_USER,
            password: env.POSTGRES_PASS,
            port: env.POSTGRES_PORT,
            database: env.POSTGRES_DB
        })
    })
});

export {db};
