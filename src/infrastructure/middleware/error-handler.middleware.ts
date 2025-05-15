import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  console.error('Error:', err);

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation error',
      details: err.errors
    });
    return;
  }

  res.status(500).json({
    error: 'Internal server error',
    message: err.message || 'Something went wrong'
  });
};