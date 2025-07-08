import migrationRunner, { RunnerOption } from "node-pg-migrate";
import { join } from "node:path";
import { getNewClient } from "src/infrastructure/database";



async function listPendingMigrations(
) {
  const dbClient = await getNewClient();

  const defaultMigrationOptions: RunnerOption = {
    dbClient,
    dryRun: true,
    direction: "up",
    dir: join("src", "infrastructure", "migrations"),
    verbose: true,
    migrationsTable: "pgmigrations",
  };
  try {
    const pendingMigrations = await migrationRunner(
      defaultMigrationOptions,
    );
    return pendingMigrations
  } finally {
    dbClient?.end();
  }
}


async function runPendingMigrations() {
  const dbClient = await getNewClient();
  try {
    const defaultMigrationOptions: RunnerOption = {
      dbClient,
      dryRun: true,
      direction: "up",
      dir: join("src", "infrastructure", "migrations"),
      verbose: true,
      migrationsTable: "pgmigrations",
    };
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });
    return migratedMigrations
  } finally {
    dbClient.end();
  }
}

export const migrator = {
  runPendingMigrations,
  listPendingMigrations
}
