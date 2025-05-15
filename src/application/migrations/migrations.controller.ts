import { Request, Response } from 'express';
import migrationRunner, { RunnerOption } from 'node-pg-migrate';
import { join } from "node:path";
import { StatusService } from 'src/domain/status/StatusService';
import { getNewClient } from 'src/infrastructure/database';
import { ZodError } from 'zod';
export class MigrationsController {
  private statusService: StatusService;

  constructor() {
    this.statusService = new StatusService();
  }

  async handle(req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
    const allowedMethods = ['GET','POST']
    if (!allowedMethods.includes(req.method)) {
      return res.status(405).send(`method ${req.method} not accepted`)
    }

    const dbClient = await getNewClient()
    const defaultMigrationOptions: RunnerOption = {
      dbClient,
      dryRun: true,
      direction: "up",
      dir: join("src", "infrastructure", "migrations"),
      verbose: true,
      migrationsTable: "pgmigrations"
    }
    if (req.method === 'GET') {
      try {
        const pendingMigrations = await migrationRunner(defaultMigrationOptions)
        return res.status(200).json(pendingMigrations);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(500).json({
            error: 'Internal validation error',
            details: error.errors
          });
        }
        return res.status(500).json({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      } finally {
        dbClient.end()
      }
    }
    if (req.method === 'POST') {
      try {
        const migratedMigrations = await migrationRunner({
          ...defaultMigrationOptions,
          dryRun: false
        })
        if (migratedMigrations.length > 0) {
          return res.status(201).json(migratedMigrations);
        }
        return res.status(200).json(migratedMigrations);

      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(500).json({
            error: 'Internal validation error',
            details: error.errors
          });
        }
        return res.status(500).json({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      } finally {
        dbClient.end()
      }
    }

    return res.status(405).send(`method ${req.method} not accepted`)
  }
}

