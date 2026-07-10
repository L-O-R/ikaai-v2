/** @type {import('next').NextConfig} */

const apiUrl = process.env.NEXT_PUBLIC_API_ORIGIN || 'http://127.0.0.1:8000';
const apiHostname = new URL(apiUrl).hostname;
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: isDev,
    remotePatterns: [
      {
        protocol: new URL(apiUrl).protocol.replace(':', ''),
        hostname: apiHostname,
        port: new URL(apiUrl).port || '',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
