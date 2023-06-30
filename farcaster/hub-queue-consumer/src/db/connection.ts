import {Kysely} from 'kysely';
import {PlanetScaleDialect} from 'kysely-planetscale';
import {Database} from './types';

const db = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
        host: 'aws.connect.psdb.cloud',
        username: '1iqbfkplhflzslh2d6rh',
        password: 'pscale_pw_xCpmRJ1VjiyvRuYqTx0fKPwWVTrSaUDgfbztZJN6zpv',
    })
});

export {db};
