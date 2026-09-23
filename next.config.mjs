/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "e-commerce-test.sgp1.digitaloceanspaces.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
