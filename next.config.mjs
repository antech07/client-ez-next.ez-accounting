const configuredRemotePatterns = [
  process.env.NEXT_PUBLIC_SPACES_URL,
  process.env.NEXT_PUBLIC_BACKEND_URL,
]
  .filter(Boolean)
  .flatMap((value) => {
    try {
      const url = new URL(value);
      return [
        {
          protocol: url.protocol.replace(":", ""),
          hostname: url.hostname,
          port: url.port,
          pathname: "/**",
        },
      ];
    } catch {
      return [];
    }
  });

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "e-commerce-test.sgp1.digitaloceanspaces.com",
        pathname: "/**",
      },
      ...configuredRemotePatterns,
    ],
  },
};

export default nextConfig;
