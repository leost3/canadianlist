import { Request, Response } from "express";
import { StatusService } from "src/domain/status/StatusService";
import { migrator } from "./migrator";
export class MigrationsController {
  private statusService: StatusService;

  constructor() {
    this.statusService = new StatusService();
  }

  async handle(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    const allowedMethods = ["GET", "POST"];
    if (!allowedMethods.includes(req.method)) {
      return res.status(405).send(`method ${req.method} not accepted`);
    }
    if (req.method === "GET") {
      const pendingMigrations = await migrator.listPendingMigrations()
      return res.status(200).json(pendingMigrations);
    }
    if (req.method === "POST") {
      const migratedMigrations = await migrator.runPendingMigrations()
      if (migratedMigrations.length > 0) {
        return res.status(201).json(migratedMigrations);
      }
      return res.status(200).json(migratedMigrations);
    }
    return res.status(405).send(`method ${req.method} not accepted`);
  }
}
