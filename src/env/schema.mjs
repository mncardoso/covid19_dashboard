// @ts-check
import { z } from 'zod';

/*  server-side schema*/
export const serverSchema = z.object({
  DATA_URL: z.string().url(),
});

/* client-side schema */
export const clientSchema = z.object({});

/* client-side variables */
export const clientEnv = {};
