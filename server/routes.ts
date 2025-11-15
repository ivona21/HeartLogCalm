import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // No backend routes - frontend connects to external API
  // See BACKEND_INTEGRATION.md for API contract details
  
  const httpServer = createServer(app);

  return httpServer;
}
