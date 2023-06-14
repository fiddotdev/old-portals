import {envsafe, num, str} from 'envsafe';
import * as dotenv from 'dotenv'

dotenv.config();

export const env = envsafe({
  NODE_ENV: str({
    devDefault: 'development',
    choices: ['development', 'test', 'production'],
  }),
  RANDOM_KEY: str(),
  RANDOM_NUM: num(),
});
