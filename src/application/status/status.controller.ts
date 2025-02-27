import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { CreateStatusSchema } from '../../domain/status/status.schema';
import { StatusService } from '../../domain/status/status.service';

export class StatusController {
  private statusService: StatusService;

  constructor() {
    this.statusService = new StatusService();
  }

  getStatus(req: Request, res: Response): void {
    try {
      const status = this.statusService.getStatus();
      res.json(status);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(500).json({
          error: 'Internal validation error',
          details: error.errors
        });
      } else {
        res.status(500).json({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error'
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
          error: 'Validation error',
          details: error.errors
        });
      } else {
        res.status(500).json({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  }

  getWelcome(req: Request, res: Response): void {
    res.send('Hello from BuyCanadian!! Here you gonna find all canadian products with discount, fuck the US, fuck you english!!! vive la liberte!!!');
  }
}