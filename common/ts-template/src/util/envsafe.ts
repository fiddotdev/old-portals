import { str, envsafe, num } from 'envsafe';

export const env = envsafe({
    NODE_ENV: str({
        devDefault: 'development',
        choices: ['development', 'test', 'production']
    }),
    RANDOM_KEY: str(),
    RANDOM_NUM: num(),
})
