import { Kysely } from 'kysely';
import { OrionDB } from '@portals/database-manager';
import { PostgresJSDialect } from 'kysely-postgres-js';
import postgres from 'postgres';
import { env } from '../utils/envsafe';
// return new Kysely<Database>({
//     dialect: new PostgresJSDialect({
//         connectionString,
//         options: {
//             max: 10,
//             types: {
//                 // BigInts will not exceed Number.MAX_SAFE_INTEGER for our use case.
//                 // Return as JavaScript's `number` type so it's easier to work with.
//                 bigint: {
//                     to: 20,
//                     from: 20,
//                     parse: (x: any) => Number(x),
//                     serialize: (x: any) => x.toString(),
//                 },
//             },
//         },
//         postgres,
//     }),
//     plugins: [new CamelCasePlugin()],
// });
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

export { db };
