import * as path from 'path';
import pg, {PoolConfig} from 'pg';
import {promises as fs} from 'fs';
import {FileMigrationProvider, Kysely, Migrator, PostgresDialect,} from 'kysely';
import {FarcasterDatabase} from '@/src';
import * as readline from 'readline';
import {env} from '@/src/utils/envSafe';

const {Pool} = pg;

async function migrateDown() {
    const args = process.argv.slice(2);
    const nameArg = args.find((arg) => arg.startsWith('--name='));

    if (nameArg) {
        const formattedNameArg = nameArg.split('=')[1];

        let poolConfig: PoolConfig;

        switch (formattedNameArg) {
            case 'orion': {
                poolConfig = {
                    host: env.ORION_POSTGRES_HOST,
                    user: env.ORION_POSTGRES_USERNAME,
                    password: env.ORION_POSTGRES_PASSWORD,
                    port: env.ORION_POSTGRES_PORT,
                    database: env.ORION_POSTGRES_DB
                }
                break;
            }
            default: {
                throw new Error('Please select a valid package.')
            }
        }

        const db = new Kysely<FarcasterDatabase>({
            dialect: new PostgresDialect({
                pool: new Pool(poolConfig),
            }),
        });

        const migrator = new Migrator({
            db,
            provider: new FileMigrationProvider({
                fs,
                path,
                migrationFolder: path.join(__dirname, '..', 'migrations', formattedNameArg),
            }),
        });

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`Are you sure you want to migrate the package ${formattedNameArg} down? (yes/no)\n`, async (question) => {
            if (question === 'yes') {
                const {error, results} = await migrator.migrateDown();

                if (results && results[0]) {
                    console.log(
                        `migration "${results[0].migrationName}" was reverted successfully`
                    );
                }

                if (error) {
                    console.error('failed to revert migration');
                    console.error(error);
                    process.exit(1);
                }
            }

            rl.close();
        })

        await db.destroy();
    } else {
        console.error('Please provide a valid package to migrate with the --name= parameter')
    }
}

(async () => {
    await migrateDown();
})();

