import { z } from 'zod';
import { StatusSchema } from './status.schema';

export type StatusEntity = z.infer<typeof StatusSchema>;