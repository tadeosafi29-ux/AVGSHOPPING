/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ya no hace falta `experimental.appDir`, Next 16 usa App Router por defecto
  compiler: {
    // Para Tailwind + styled-jsx
    styledComponents: true,
  },
};

module.exports = nextConfig;
