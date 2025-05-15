import { Request, Response } from "express";
import { CreateStatusSchema } from "src/domain/status/status.schema";
import { StatusService } from "src/domain/status/StatusService";
import { query } from "src/infrastructure/database";
import { ZodError } from "zod";

export class StatusController {
  private statusService: StatusService;

  constructor() {
    this.statusService = new StatusService();
  }

  async getStatus(req: Request, res: Response): Promise<void> {
    try {
      const datname = process.env.POSTGRES_DB;
      const updatedAt = new Date().toISOString();
      const databaseVersionResult = await query("SHOW server_version;");
      const version = databaseVersionResult.rows[0].server_version;
      const maxConnectionsResult = await query("SHOW max_connections;");
      const maxConnections = maxConnectionsResult.rows[0].max_connections;
      const databaseOpenedConnectionsResult = await query({
        text: "SELECT COUNT(*):: int FROM pg_stat_activity WHERE datname = $1;",
        values: [datname],
      });
      const openConnections = databaseOpenedConnectionsResult.rows[0].count;
      res.status(200).json({
        updatedAt,
        dependencies: {
          database: {
            version,
            maxConnections,
            openConnections,
          },
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(500).json({
          error: "Internal validation error",
          details: error.errors,
        });
      } else {
        res.status(500).json({
          error: "Internal server error",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  }

  createStatus(req: Request, res: Response): void {
    try {
      // Validate request body against the schema
      const validatedData = CreateStatusSchema.parse(req.body);

      // Process the validated data
      const status = this.statusService.createStatus(validatedData);

      // Return the created status with 201 status code
      res.status(201).json(status);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Validation error",
          details: error.errors,
        });
      } else {
        res.status(500).json({
          error: "Internal server error",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  }

  getWelcome(req: Request, res: Response): void {
    res.send(
      "Hello from BuyCanadian!! Here you gonna find all canadian products with discount, fuck the US, fuck you english!!! vive la liberte!!!",
    );
  }
}
