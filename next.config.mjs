import { env } from "./src/env/server.mjs";

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function nextConfig(config) {
  return config;
}

export default nextConfig({
  reactStrictMode: true,
  swcMinify: true,
});
