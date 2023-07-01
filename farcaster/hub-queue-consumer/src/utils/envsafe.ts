import {envsafe, num, str} from 'envsafe';
import * as dotenv from 'dotenv';

console.warn('--------------- Node Environment ---------------');
console.warn(process.env.NODE_ENV);
console.warn('--------------- Node Environment ---------------');

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

export const env = envsafe({
    SQS_URL: str(),
    SQS_REGION: str(),
    SQS_API_VERSION: str({
        default: '2012-11-05',
    }),
    AWS_ACCESS_KEY_ID: str({
        allowEmpty: true,
    }),
    AWS_SECRET_ACCESS_KEY: str({
        allowEmpty: true,
    }),
    POSTGRES_HOST: str(),
    POSTGRES_USER: str(),
    POSTGRES_PASS: str(),
    POSTGRES_PORT: num(),
    POSTGRES_DB: str(),
});
