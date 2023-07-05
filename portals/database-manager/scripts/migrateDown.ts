import * as path from 'path';
import {promises as fs} from 'fs';
import {FileMigrationProvider, Kysely, Migrator,} from 'kysely';
import {OrionDB} from '../src';
import * as readline from 'readline';
import {env} from '../src/utils/envSafe';
import {PostgresJSDialect, PostgresJSDialectConfig} from 'kysely-postgres-js';
import postgres from 'postgres';

async function migrateDown() {
    const args = process.argv.slice(2);
    const nameArg = args.find((arg) => arg.startsWith('--name='));

    if (nameArg) {
        const formattedNameArg = nameArg.split('=')[1];

        let poolConfig: PostgresJSDialectConfig;

        switch (formattedNameArg) {
            case 'orion': {
                poolConfig = {
                    connectionString: `postgresql://${env.ORION_POSTGRES_USERNAME}:${env.ORION_POSTGRES_PASSWORD}@${env.ORION_POSTGRES_HOST}:${env.ORION_POSTGRES_PORT}/${env.ORION_POSTGRES_DB}`,
                    options: {
                        max: 10
                    },
                    postgres
                };
                break;
            }
            default: {
                throw new Error('Please select a valid package.');
            }
        }

        const db = new Kysely<OrionDB>({
            dialect: new PostgresJSDialect(poolConfig),
        });

        const migrator = new Migrator({
            db,
            provider: new FileMigrationProvider({
                fs,
                path,
                migrationFolder: path.join(
                    __dirname,
                    '..',
                    'migrations',
                    formattedNameArg
                ),
            }),
        });

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(
            `Are you sure you want to migrate the package ${formattedNameArg} down? (yes/no)\n`,
            async (question) => {
                if (question === 'yes') {
                    console.log('Starting Migration Down');
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
            }
        );

        await db.destroy().then(() => {
            console.log('Destroyed DB successfuly');
        }).catch(() => {
            console.error('Failed to destroy DB!')
        });
    } else {
        console.error(
            'Please provide a valid package to migrate with the --name= parameter'
        );
    }
}

(async () => {
    await migrateDown();
})();
