/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         "util": false
//       };
//     }

//     return config;
//   }
// };

module.exports = nextConfig;
