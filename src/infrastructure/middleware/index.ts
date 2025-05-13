import express, { Application } from "express";
import { errorHandler } from "./error-handler.middleware";

export const configureMiddleware = (app: Application): void => {
  // Middleware to parse JSON bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Error handling middleware should be registered last
  app.use(errorHandler);
};
