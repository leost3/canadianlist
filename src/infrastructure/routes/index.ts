import { Application } from 'express';
import { statusRoutes } from './status.routes';

export const registerRoutes = (app: Application): void => {
  // Register all routes
  statusRoutes(app);
};