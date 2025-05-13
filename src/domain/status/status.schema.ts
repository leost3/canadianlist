import { z } from "zod";

export const StatusSchema = z.object({
  serviceName: z.string(),
  version: z.string(),
  nodeVersion: z.string(),
  status: z.enum(["operational", "degraded", "maintenance", "offline"]),
  uptime: z.number().positive(),
  timestamp: z.string().datetime(),
});

export const CreateStatusSchema = z.object({
  serviceName: z.string().min(1, "Service name is required"),
  status: z.enum(["operational", "degraded", "maintenance", "offline"]),
  message: z.string().optional(),
});

export type StatusType = z.infer<typeof StatusSchema>;
export type CreateStatusType = z.infer<typeof CreateStatusSchema>;
