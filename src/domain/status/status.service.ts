import { StatusEntity } from './status.entity';
import { CreateStatusType, StatusSchema } from './status.schema';

export class StatusService {
  getStatus(): StatusEntity {
    const status = {
      serviceName: 'Express API',
      version: '1.0.0',
      nodeVersion: process.versions.node,
      status: 'operational' as const,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };

    // Validate the status object against the schema
    return StatusSchema.parse(status);
  }

  createStatus(data: CreateStatusType): StatusEntity {
    // Create a full status object from the input data
    const status = {
      serviceName: data.serviceName,
      version: '1.0.0',
      nodeVersion: process.versions.node,
      status: data.status,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };

    // Validate the status object against the schema
    return StatusSchema.parse(status);
  }
}