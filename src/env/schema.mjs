// @ts-check
import { z } from "zod";

/*  server-side schema*/
export const serverSchema = z.object({
	DATA_URL: z.string().url(),
});

/* client-side schema */
export const clientSchema = z.object({
	NEXT_PUBLIC_ICON_URL: z.string().url(),
});

/* client-side variables */
export const clientEnv = {
	NEXT_PUBLIC_ICON_URL: process.env.NEXT_PUBLIC_ICON_URL,
};
