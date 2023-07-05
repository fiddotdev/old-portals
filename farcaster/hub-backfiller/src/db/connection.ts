import {Kysely} from 'kysely';
import {OrionDB} from '@portals/database-manager';
import {PostgresJSDialect} from 'kysely-postgres-js';
import postgres from 'postgres';
import {env} from '../utils/envsafe';

const db = new Kysely<OrionDB>({
    dialect: new PostgresJSDialect({
        connectionString: `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASS}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
        options: {
            max: 10,
            types: {
                bigint: {
                    to: 20,
                    from: 20,
                    // eslint-disable-next-line
                    parse: (x: any) => Number(x),
                    // eslint-disable-next-line
                    serialize: (x: any) => x.toString(),
                },
            },
        },
        postgres,
    }),
});

export {db};
