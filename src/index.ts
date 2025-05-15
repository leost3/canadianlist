import express from "express";
import { configureMiddleware } from "./infrastructure/middleware";
import { registerRoutes } from "./infrastructure/routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
configureMiddleware(app);

// Register routes
registerRoutes(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/status`);
});
