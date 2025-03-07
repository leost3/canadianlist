import { Application } from 'express';
import { migrationsRoutes } from './migrations.routes';
import { statusRoutes } from './status.routes';

export const registerRoutes = (app: Application): void => {
  // Register all routes
  statusRoutes(app);
  migrationsRoutes(app);
};