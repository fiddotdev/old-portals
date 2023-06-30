import {Kysely} from 'kysely';
import {PlanetScaleDialect} from 'kysely-planetscale';
import {Database} from './types';

const db = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
        host: '',
        username: '',
        password: '',
    }),
});

export {db};
