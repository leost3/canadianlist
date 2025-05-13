import { Application, Request, Response } from "express";
import { StatusController } from "../../application/status/status.controller";

export const statusRoutes = (app: Application): void => {
  const statusController = new StatusController();

  app.get("/", (req: Request, res: Response) =>
    statusController.getWelcome(req, res),
  );
  app.get("/api/status", (req: Request, res: Response) =>
    statusController.getStatus(req, res),
  );
  app.post("/api/status", (req: Request, res: Response) =>
    statusController.createStatus(req, res),
  );
};
