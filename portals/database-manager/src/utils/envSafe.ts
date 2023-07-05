import { envsafe, num, str } from 'envsafe';
import * as dotenv from 'dotenv';

console.warn('--------------- Node Environment ---------------');
console.warn(process.env.NODE_ENV);
console.warn('--------------- Node Environment ---------------');

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const env = envsafe({
  ORION_POSTGRES_HOST: str({
    allowEmpty: true,
  }),
  ORION_POSTGRES_USERNAME: str({
    allowEmpty: true,
  }),
  ORION_POSTGRES_PASSWORD: str({
    allowEmpty: true,
  }),
  ORION_POSTGRES_PORT: num({
    allowEmpty: true,
  }),
  ORION_POSTGRES_DB: str({
    allowEmpty: true,
  }),
});
