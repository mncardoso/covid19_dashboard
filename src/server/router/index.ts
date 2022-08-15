// src/server/router/index.ts
import { createRouter } from "@/server/router/context";
import superjson from "superjson";

import { owid } from "@/server/router/owid";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("owid.", owid);

// export type definition of API
export type AppRouter = typeof appRouter;
