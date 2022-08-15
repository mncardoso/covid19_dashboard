// src/server/router/index.ts
import { createRouter } from "@/server/router/context";
import superjson from "superjson";

import { owid } from "@/server/router/owid";
import { protectedExampleRouter } from "@/server/router/protected-example-router";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("owid.", owid)
	.merge("question.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
