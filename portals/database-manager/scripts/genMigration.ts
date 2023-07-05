// generateMigration.ts
import * as path from 'path';
import { promises as fs } from 'fs';

async function generateMigration(
  migrationName: string,
  selectedPackage: string
) {
  const timestamp = Date.now();
  const fileName = `${timestamp}-${migrationName}.ts`;
  const migrationFolderPath = path.join(
    __dirname,
    '..',
    'migrations',
    selectedPackage
  );
  const filePath = path.join(migrationFolderPath, fileName);

  const content = `import { Kysely } from 'kysely';

// eslint-disable-next-line
export async function up(db: Kysely<any>): Promise<void> {
  // Write your migration code here
}

// eslint-disable-next-line
export async function down(db: Kysely<any>): Promise<void> {
  // Write your code to revert the migration here
}
`;

  await fs.writeFile(filePath, content, 'utf8');
  console.log(`Migration file "${fileName}" created.`);
}

// Get the migration name from the command line arguments
const args = process.argv.slice(2);
const nameArg = args.find((arg) => arg.startsWith('--name='));
const packageArg = args.find((arg) => arg.startsWith('--package='));

if (nameArg) {
  const migrationName = nameArg.split('=')[1];
  if (packageArg) {
    const packageName = packageArg.split('=')[1];
    generateMigration(migrationName, packageName);
  } else {
    console.error('Please provide a valid package name.');
  }
} else {
  console.error(
    'Please provide a migration name using --name=YourMigrationName'
  );
  process.exit(1);
}
