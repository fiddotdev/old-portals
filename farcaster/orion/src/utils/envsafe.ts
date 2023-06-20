import { envsafe, str } from 'envsafe';
import * as dotenv from 'dotenv';

console.warn('--------------- Node Environment ---------------');
console.warn(process.env.NODE_ENV);
console.warn('--------------- Node Environment ---------------');

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const env = envsafe({
  HUB_RPC_URL: str(),
  SQS_URL: str(),
  SQS_REGION: str(),
  SQS_API_VERSION: str({
    default: '2012-11-05',
  }),
  ACCESS_KEY_ID: str({
    allowEmpty: true,
  }),
  SECRET_ACCESS_KEY: str({
    allowEmpty: true,
  }),
});
