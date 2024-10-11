/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode to detect potential issues in your React code
  reactStrictMode: true,

  // This is important for environment variables such as API URLs and sensitive data
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Ensure this is set in your environment variables (.env.local or in your deployment)
  },

  // Configures the API routes and middleware settings (if needed in the future)
  async headers() {
    return [
      {
        // Enable CORS headers for APIs if needed
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Content-Type, Authorization" },
        ],
      },
    ];
  },


  // Additional Webpack configurations if needed
  webpack: (config) => {
    // Modify the Webpack configuration here if you need specific settings for your Zustand store or others
    return config;
  },
};

export default nextConfig;
