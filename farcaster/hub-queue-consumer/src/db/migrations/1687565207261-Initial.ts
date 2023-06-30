import {Kysely} from 'kysely';

// eslint-disable-next-line
export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('farcaster_messages')
        .addColumn('id', 'varchar', (col) => col.primaryKey())
        .execute();
}

// eslint-disable-next-line
export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('farcaster_messages').execute();
}
