import { envsafe, num, str } from 'envsafe';
import * as dotenv from 'dotenv';
import * as os from 'os';

console.warn('--------------- Node Environment ---------------');
console.warn(process.env.NODE_ENV);
console.log(os.cpus().length);
console.warn('--------------- Node Environment ---------------');

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const env = envsafe({
  HUB_RPC_URL: str(),
  POSTGRES_HOST: str(),
  POSTGRES_USER: str(),
  POSTGRES_PASS: str(),
  POSTGRES_PORT: num(),
  POSTGRES_DB: str(),
  MAX_CONCURRENCY: num({
    default: os.cpus().length,
  }),
});
