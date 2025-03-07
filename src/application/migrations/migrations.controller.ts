import { Request, Response } from 'express';
import migrationRunner from 'node-pg-migrate';
import { join } from "node:path";
import { StatusService } from 'src/domain/status/StatusService';
import { ZodError } from 'zod';
export class MigrationsController {
  private statusService: StatusService;

  constructor() {
    this.statusService = new StatusService();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const migrations = await migrationRunner({
        databaseUrl: process.env.DATABASE_URL || "",
        dryRun: true,
        direction: "up",
        dir: join("src","infrastructure", "migrations"),
        verbose: true,
        migrationsTable:"pgmigrations"
      })
      res.status(200).json(migrations);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(500).json({
          error: 'Internal validation error',
          details: error.errors
        });
      } else {
        res.status(500).json({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  }
}

