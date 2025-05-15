import { Application, Request, Response } from "express";
import { MigrationsController } from "src/application/migrations/migrations.controller";

export const migrationsRoutes = (app: Application): void => {
  const migrationsController = new MigrationsController();
  app.get("/api/migrations", (req: Request, res: Response) =>
    migrationsController.handle(req, res),
  );
  app.post("/api/migrations", (req: Request, res: Response) =>
    migrationsController.handle(req, res),
  );
};
