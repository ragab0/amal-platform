/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.licdn.com", "lh3.googleusercontent.com"],
  },
  async headers() {
    // Extract just the origin from the API URL FOR PRO;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const origin = new URL(apiUrl).origin;
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: origin,
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
