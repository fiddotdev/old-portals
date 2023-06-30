import * as path from 'path';
import {promises as fs} from 'fs';
import {FileMigrationProvider, Kysely, Migrator, PostgresDialect,} from 'kysely';
import {Database} from '../src/db/types';
import {Pool} from 'pg';

async function migrateDown() {
    const db = new Kysely<Database>({
        dialect: new PostgresDialect({
            pool: new Pool({
                host: 'portals-prod-db.cjvvm7q8rogl.us-west-1.rds.amazonaws.com',
                user: 'postgres',
                password: 'Ab6EemxdVT&o9B&YG&C6G5Tx',
                database: 'postgres'
            })
        })
    });

    const migrator = new Migrator({
        db,
        provider: new FileMigrationProvider({
            fs,
            path,
            migrationFolder: path.join(__dirname, '..', 'src', 'db', 'migrations'),
        }),
    });

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

    await db.destroy();
}

migrateDown();
