import * as path from 'path';
import {promises as fs} from 'fs';
import {FileMigrationProvider, Kysely, Migrator, PostgresDialect,} from 'kysely';
import pg, {PoolConfig} from 'pg';
import {FarcasterDatabase} from '@/src';
import {env} from '@/src/utils/envSafe';
import * as readline from 'readline';

const {Pool} = pg;

export async function migrateToLatest(packageName: string) {
    let poolConfig: PoolConfig;

    const allowedPackages = ['orion'];
    switch (packageName) {
        case 'orion': {
            poolConfig = {
                host: env.ORION_POSTGRES_HOST,
                user: env.ORION_POSTGRES_USERNAME,
                password: env.ORION_POSTGRES_PASSWORD,
                port: env.ORION_POSTGRES_PORT,
                database: env.ORION_POSTGRES_DB,
            };
            break;
        }
        default: {
            throw new Error(`Please select a valid package. One of: ${allowedPackages.join(', ')}`);
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
            migrationFolder: path.join(__dirname, '..', 'migrations'),
        }),
    });

    const {error, results} = await migrator.migrateToLatest();

    results?.forEach((it) => {
        if (it.status === 'Success') {
            console.log(`migration "${it.migrationName}" was executed successfully`);
        } else if (it.status === 'Error') {
            console.error(`failed to execute migration "${it.migrationName}"`);
        }
    });

    if (error) {
        console.error('failed to migrate');
        console.error(error);
        process.exit(1);
    }

    await db.destroy();
}

const args = process.argv.slice(2);
const nameArg = args.find((arg) => arg.startsWith('--name='));

const allowedPackages = ['orion'];
if (nameArg) {
    if (allowedPackages.includes(nameArg.split('=')[1])) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(
            `Are you sure you want to migrate up on package '${
                nameArg.split('=')[1]
            }'? yes/no\n`,
            (answer) => {
                if (answer === 'yes') {
                    migrateToLatest(nameArg.split('=')[1]).then(() => {
                        console.log('Migrated to latest');
                    });
                }
                rl.close();
            }
        );
    } else {
        console.error(
            `Please provide a valid package, one of: ${allowedPackages.join(', ')}`
        );
    }
} else {
    console.error(
        'Please provide a valid package to migrate with the --name= parameter'
    );
}
