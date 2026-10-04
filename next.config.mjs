import { env } from "./src/env/server.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// Keep env validation on config load.
void env;

export default nextConfig;
